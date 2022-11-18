import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS_AND_GENRES } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('');

  const result = useQuery(ALL_BOOKS_AND_GENRES, {
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return null;
  }

  const books = result.data.allBooks;
  const genres = result.data.allGenres;

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre === '' ? 'all genres' : genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => {
          return (
            <button
              key={genre}
              onClick={() => {
                setGenre(genre);
              }}
            >
              {genre}
            </button>
          );
        })}
        <button
          key={'all genres'}
          onClick={() => {
            setGenre('');
          }}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
