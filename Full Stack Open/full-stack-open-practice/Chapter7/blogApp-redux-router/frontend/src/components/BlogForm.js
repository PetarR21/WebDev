import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blog';
import { showNotification } from '../reducers/notification';

const BlogForm = ({ blogFormRef }) => {
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');

  const dispatch = useDispatch();

  const reset = () => {
    title.reset();
    author.reset();
    url.reset();
  };

  const addBlog = async (event) => {
    event.preventDefault();

    dispatch(
      createBlog({ title: title.fields.value, author: author.fields.value, url: url.fields.value }, blogFormRef, reset)
    );
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title'>title</label>
          <input {...title.fields} />
        </div>
        <div>
          <label htmlFor='author'>author</label>
          <input {...author.fields} />
        </div>
        <div>
          <label htmlFor='url'>url</label>
          <input {...url.fields} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
