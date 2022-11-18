import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const Recommend = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const [books, setBooks] = useState([]);

  const result = useQuery(ME, {
    skip: !show,
  });

  const booksResult = useQuery(ALL_BOOKS, {
    skip: !genre,
    variables: { genre },
  });

  useEffect(() => {
    if (result.data) {
      setGenre(result.data.me.favouriteGenre);
    }
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [result.data, booksResult.data]);

  if (result.loading || booksResult.loading) {
    return null;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
