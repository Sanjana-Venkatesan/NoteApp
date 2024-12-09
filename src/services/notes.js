import axios from 'axios'
const baseUrl = 'http://localhost:4000/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getnotesofuser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const deleteNote = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken,getnotesofuser,deleteNote }