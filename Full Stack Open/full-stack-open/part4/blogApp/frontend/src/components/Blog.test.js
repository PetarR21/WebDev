import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders title and author by default', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 'testLikes',
    user: {
      name: 'testUserName',
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const showDiv = container.querySelector('.showByDefault');
  const hideDiv = container.querySelector('.hideByDefault');

  expect(showDiv).toBeDefined();
  expect(hideDiv).toBeDefined();

  expect(showDiv).toHaveTextContent('testTitle testAuthor');

  expect(showDiv).not.toHaveStyle('display: none');
  expect(hideDiv).toHaveStyle('display: none');
});

test('likes and url are shown when view button is clicked', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 'testLikes',
    user: {
      name: 'testUserName',
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const hideDiv = container.querySelector('.hideByDefault');

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  expect(hideDiv).not.toHaveStyle('display: none');
});

test('if the like button is clicked twice, the event handler  is called twice', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 'testLikes',
    user: {
      name: 'testUserName',
    },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} incrementLikes={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
