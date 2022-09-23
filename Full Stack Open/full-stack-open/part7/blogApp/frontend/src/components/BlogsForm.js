import { useState } from 'react';

const BlogsForm = ({ createBlog }) => {
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
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog} className='formDiv'>
        <div>
          title
          <input
            id='title'
            className='titleInput'
            type='text'
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          author
          <input
            id='author'
            className='authorInput'
            type='text'
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </div>
        <div>
          url
          <input
            id='url'
            className='urlInput'
            type='text'
            value={url}
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        <button id="createBtn"type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogsForm;
