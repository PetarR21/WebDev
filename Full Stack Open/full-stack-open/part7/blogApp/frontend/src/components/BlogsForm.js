import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import useField from '../hooks/useField';
import Togglable from './Togglable';

const BlogsForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();

  const togglableRef = useRef();

  const addBlog = (event) => {
    event.preventDefault();

    dispatch(createBlog({ title: title.fields.value, author: author.fields.value, url: url.fields.value }));
    title.reset();
    author.reset();
    url.reset();
    togglableRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel='new blog' ref={togglableRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog} className='formDiv'>
        <div>
          title
          <input id='title' className='titleInput' {...title.fields} />
        </div>
        <div>
          author
          <input id='author' className='authorInput' {...author.fields} />
        </div>
        <div>
          url
          <input id='url' className='urlInput' {...url.fields} />
        </div>
        <button id='createBtn' type='submit'>
          create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogsForm;
