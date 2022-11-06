import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('<BlogForm/>', () => {
  test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector('.titleInput');
    const authorInput = container.querySelector('.authorInput');
    const urlInput = container.querySelector('.urlInput');
    const submitBtn = container.querySelector('.submitBtn');

    await user.type(titleInput, 'test title');
    await user.type(authorInput, 'test author');
    await user.type(urlInput, 'test url');
    await user.click(submitBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('test title');
    expect(createBlog.mock.calls[0][0].author).toBe('test author');
    expect(createBlog.mock.calls[0][0].url).toBe('test url');
  });
});
