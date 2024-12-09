import axios from 'axios';
const baseUrl = 'http://localhost:4000/api/users'; // Adjust based on your backend

const register = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { register };
