const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const DataLoader = require('dataloader')

const authorLoader = new DataLoader(async (authorIds) => {
  const authors = await Author.find({})

  const authorsWithBookCount = authors.map( async (author) => {
    const books = await Book.find({ author: author._id  }) 

    return {
      ...author._doc,
      bookCount: books.length
    }
  })


  return authorsWithBookCount
})

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        if (args.genre) {
          return Book.find({ author: args.author, genres: args.genre }).populate('author')
        }

        return Book.find({ author: args.author }).populate('author')
      }

      if (args.genre) {
        if (args.author) {
          return Book.find({ author: args.author, genres: args.genre }).populate('author')
        }

        return Book.find({ genres: args.genre }).populate('author')
      }

      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const ids = [
        '64bb6dc7a05d2338e5d56d1e',
        '64bb6dd6a05d2338e5d56d22',
        '64bb6de4a05d2338e5d56d26',
        '64bb6df6a05d2338e5d56d2a',
        '64bb6dffa05d2338e5d56d2e',
      ]

      console.log('Author.find');

      return authorLoader.loadMany(ids)
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  // Author: {
  //   bookCount: async (root) => {
  //     const books = await Book.find({ author: root._id  }) 
  //     return books.length
  //   }
  // },

  Mutation: {
    addBook: async (root, args, context) => {
      const newBook = new Book({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('title is invalid', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, context) => {
      const exsistingAuthor = await Author.find({ name: args.name })
      
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (exsistingAuthor) {
        try {
          const updatedAuthor = await Author.findByIdAndUpdate(exsistingAuthor[0]._id, { ...exsistingAuthor, born: args.setBornTo }, { new: true })

          return updatedAuthor
        } catch (error) {
          throw new GraphQLError('Editing Author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }
      }

      return null
    },
    addAuthor: async (root, args, context) => {
      const newAuthor = new Author({ ...args })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      try {
        await newAuthor.save()
      } catch (error) {
        throw new GraphQLError('Name is too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      return newAuthor
    },
    createUser: async (root, args) => {
      const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return newUser.save()
        .catch((error) => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'blue') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { favGenre: user.favoriteGenre, value: jwt.sign(userForToken, '123456789') }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
