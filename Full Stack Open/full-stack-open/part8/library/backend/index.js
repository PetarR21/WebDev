require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
const book = require('./models/book');

console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author');
      return books.filter((book) => book.author.name === root.name).length;
    },
  },
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      let booksToReturn = await Book.find({}).populate('author');

      if (args.author) {
        booksToReturn = booksToReturn.filter((book) => book.author.name == args.author);
      }

      if (args.genre) {
        booksToReturn = booksToReturn.filter((book) => book.genres.includes(args.genre));
      }

      return booksToReturn;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, born: null });
        await author.save();
      }

      const book = new Book({ ...args, author: author.id });

      const savedBook = await book.save();
      return savedBook.populate('author');
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      const savedAuthor = await author.save();
      return savedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
