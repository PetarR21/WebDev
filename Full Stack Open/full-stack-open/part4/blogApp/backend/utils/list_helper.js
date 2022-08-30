const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
        .map((blog) => blog.likes)
        .reduce((total, likes) => total + likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce(
        (max, blog) => (max.likes > blog.likes ? max : blog),
        blogs[0]
      );
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? null
    : _.maxBy(
        _.map(_.groupBy(blogs, 'author'), (n) => {
          return {
            author: n[0].author,
            blogs: n.length,
          };
        }),
        'blogs'
      );
};

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? null
    : _.maxBy(
        _.map(_.groupBy(blogs, 'author'), (key, value) => {
          return {
            author: value,
            likes: key.reduce((total, object) => total + object.likes, 0),
          };
        }),
        'likes'
      );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
