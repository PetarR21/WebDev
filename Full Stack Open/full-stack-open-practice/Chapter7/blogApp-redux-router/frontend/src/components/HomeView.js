import Togglable from './Togglable';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const HomeView = ({ blogFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel={'create new'} ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default HomeView;
