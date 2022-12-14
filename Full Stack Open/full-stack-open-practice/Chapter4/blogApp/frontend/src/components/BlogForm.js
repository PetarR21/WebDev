import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
            className='titleInput'
            id='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
            className='authorInput'
            id='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => {
              setUrl(target.value);
            }}
            className='urlInput'
            id='url'
          />
        </div>
        <button type='submit' className='submitBtn' id='submitBtn'>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
