import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      id
      genres
      author {
        bookCount
        born
        id
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author {
        bookCount
        born
        id
        name
      }
      genres
      published
      title
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ALL_BOOKS_AND_GENRES = gql`
  query allBooksAndGenres($genre: String) {
    allBooks(genre: $genre) {
      genres
      id
      published
      title
      author {
        bookCount
        born
        id
        name
      }
    }
    allGenres
  }
`;

export const ME = gql`
  query me {
    me {
      favouriteGenre
      id
      username
    }
  }
`;
