import axios from 'axios';
import userService from './user';
const baseUrl = '/api/blogs';

const config = () => {
  return {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const updateBlog = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, createNew, updateBlog, deleteBlog };
