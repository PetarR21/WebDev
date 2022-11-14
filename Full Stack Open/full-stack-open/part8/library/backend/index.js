const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
require('dotenv').config();
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      return (await Book.find({})).length;
    },
    authorCount: async () => {
      return (await Author.find({})).length;
    },
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author');

      if (args.author) {
        books = books.filter((book) => book.author.name === args.author);
      }

      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author');
      return books.filter((book) => {
        return book.author.name === root.name;
      }).length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author, born: null });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const book = new Book({
        title: args.title,
        author: author.id,
        published: args.published,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book.populate('author');
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre });

      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credidentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
