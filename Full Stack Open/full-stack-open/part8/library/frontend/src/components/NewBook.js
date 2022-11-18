import { useEffect, useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_GENRES, CREATE_BOOK } from '../queries';
import { useMutation } from '@apollo/client';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook, result] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error);
      props.setError(error.graphQLErrors[0].message);
    },
    update: (cache, response) => {
      const genres = response.data.addBook.genres;

      cache.updateQuery({ query: ALL_BOOKS_AND_GENRES, variables: { genre: '' } }, ({ allBooks, allGenres }) => {
        genres.forEach((genre) => {
          if (!allGenres.includes(genre)) {
            allGenres = allGenres.concat(genre);
          }
        });

        return {
          allBooks: allBooks.concat(response.data.addBook),
          allGenres,
        };
      });
      genres.forEach((genre) => {
        if (Object.keys(cache.data.data.ROOT_QUERY).includes(`allBooks({\"genre\":\"${genre}\"})`)) {
          cache.updateQuery({ query: ALL_BOOKS_AND_GENRES, variables: { genre } }, ({ allBooks, allGenres }) => {
            return {
              allBooks: allBooks.concat(response.data.addBook),
              allGenres,
            };
          });
        }
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const author = response.data.addBook.author;
        const allAuthorsNames = allAuthors.map((a) => a.name);

        return {
          allAuthors: allAuthorsNames.includes(author.name) ? allAuthors : allAuthors.concat(author),
        };
      });
    },
  });

  useEffect(() => {
    if (result.data) {
      setTitle('');
      setPublished('');
      setAuthor('');
      setGenres([]);
      setGenre('');
      props.setPage('books');
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published: Number(published), genres } });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
