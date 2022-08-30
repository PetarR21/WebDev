import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogsForm from './BlogsForm';

test('form calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogsForm createBlog={createBlog} />);

  const titleInput = container.querySelector('.titleInput');
  const authorInput = container.querySelector('.authorInput');
  const urlInput = container.querySelector('.urlInput');
  const submitButton = screen.getByText('create');

  await user.type(titleInput, 'test title');
  await user.type(authorInput, 'test author');
  await user.type(urlInput, 'test url');
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('test title');
  expect(createBlog.mock.calls[0][0].author).toBe('test author');
  expect(createBlog.mock.calls[0][0].url).toBe('test url');
});
