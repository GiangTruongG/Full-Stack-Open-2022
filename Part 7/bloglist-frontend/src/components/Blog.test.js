import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blog = {
  'title': 'This is the eighth blog!',
  'author': 'Jess',
  'url': 'http://abc.com',
  'likes': 22
}

test('renders Blog with only title and author properties', () => {
  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')
  const btn = container.querySelector('.btn-visible')

  expect(title).toHaveTextContent('This is the eighth blog!')
  expect(author).toHaveTextContent('Jess')
  expect(btn).toHaveTextContent('view')
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders Blog with all properties', () => {
  const { container } = render(<Blog blog={blog} />)

  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')
  const btn = container.querySelector('.btn-visible')

  expect(btn).toHaveTextContent('hide')
  expect(url).toHaveTextContent('http://abc.com')
  expect(likes).toHaveTextContent(22)
})

test('clicking the likes button twice resulting in the event handler getting called twice', async () => {
  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleLikes={mockHandler} />)

  const user = userEvent.setup()
  const likesBtn = container.querySelector('.likes-btn')
  await user.click(likesBtn)
  await user.click(likesBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlog handleCreateBlog={createBlog} />)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')
  const btnCreate = container.querySelector('.btn-create')

  await user.type(title, 'This is the test blog!')
  await user.type(author, 'Jess')
  await user.type(url, 'http://abc.com')
  await user.type(likes, '22')

  await user.click(btnCreate)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is the test blog!')
  expect(createBlog.mock.calls[0][0].author).toBe('Jess')
  expect(createBlog.mock.calls[0][0].url).toBe('http://abc.com')
  expect(createBlog.mock.calls[0][0].likes).toBe('22')

})