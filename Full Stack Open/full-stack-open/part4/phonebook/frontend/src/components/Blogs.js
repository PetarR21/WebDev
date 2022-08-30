import Blog from './Blog';

const Blogs = ({ blogs, incrementLikes, removeBlog }) => {
  const sortedBlogs = blogs.sort((blog1, blog2) => {
    return blog2.likes - blog1.likes;
  });

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          incrementLikes={incrementLikes}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default Blogs;
