import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (noteObject) => {
  const response = await axios.post(baseUrl, noteObject);
  return response.data;
};

const deleteNote = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

const updateNote = async (id, noteObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, noteObject);
  return response.data;
};
export default { getAll, create, deleteNote, updateNote };
