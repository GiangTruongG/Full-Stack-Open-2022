describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      'username': 'Jasmine Bui',
      'name': 'Dinh Bui',
      'password': '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', () => {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('Jasmine Bui')
      cy.get('#password').type('123456')
      cy.get('#login-btn').click()

      cy.contains('Jasmine Bui logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('Jasmine Buis')
      cy.get('#password').type('123456')
      cy.get('#login-btn').click()

      cy.contains('Wrong username or password!')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('Jasmine Bui')
      cy.get('#password').type('123456')
      cy.get('#login-btn').click()

      cy.contains('New Blog').click()
      const title = cy.get('.title')
      const author = cy.get('.author')
      const url = cy.get('.url')
      const likes = cy.get('.likes')
      title.type('This is just a test blog!')
      author.type('Nick')
      url.type('https://abcdef.com.au')
      likes.type('10')
      cy.get('.btn-create').click()

      cy.contains('New Blog').click()
      title.type('This is just the second test blog!')
      author.type('Tommy')
      url.type('https://abcdef.com.au')
      likes.type('8')
      cy.get('.btn-create').click()
    })

    it('A blog can be created', () => {
      cy.contains('This is just a test blog!')
    })

    it('The user can like a blog', () => {
      cy.get('.likes-btn').click()
      cy.contains('34')
      cy.contains('successfully liked!')
    })

    it('the user who created a blog can delete the blog', () => {
      cy.contains('Remove').click()
      cy.get('html').should('not.contain', 'This is just a test blog!')
    })

    it('the creator can see the delete button of a blog, not anyone else', () => {
      cy.get('.creator').then(creators => {
        cy.wrap(creators).each(creator => {
          cy.wrap(creator).contains('Dinh Bui').parent().find('button').contains('Remove')
        })
      })
    })

    it.only('the blogs are ordered according to likes with the blog with the most likes being first', () => {
      cy.get('.blog').eq(0).should('contain', 'This is just a test blog!')
      cy.get('.blog').eq(1).should('contain', 'This is just the second test blog!')

      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(2000)
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(2000)
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(2000)

      cy.get('.blog').eq(1).should('contain', 'This is just a test blog!')
      cy.get('.blog').eq(0).should('contain', 'This is just the second test blog!')
    })
  })
})