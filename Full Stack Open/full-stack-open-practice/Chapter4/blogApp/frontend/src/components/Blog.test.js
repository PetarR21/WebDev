import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog/>', () => {
  test("renders the blog's title and author, but does not render its url or number of likes by default", () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
    };

    const { container } = render(<Blog blog={blog} />);

    const blogDefault = container.querySelector('.blogDefault');
    expect(blogDefault).toHaveStyle('display: block');
    const blogFull = container.querySelector('.blogFull');
    expect(blogFull).toHaveStyle('display: none');
  });

  test("log's url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
    };

    const { container } = render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const blogFull = container.querySelector('.blogFull');
    expect(blogFull).toHaveStyle('display: block');
  });

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
    };

    const mockHandler = jest.fn();

    const { container } = render(<Blog blog={blog} updateLikes={mockHandler} />);
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = container.querySelector('.likeBtn');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
