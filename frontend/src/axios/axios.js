import axios from 'axios';

// export const axiosHomeInstance = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });
export const axiosClientInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});
export const axiosAdminInstance = axios.create({
  baseURL: 'http://localhost:5000/admin/api',
});
export const axiosTrainerInstance = axios.create({
  baseURL: 'http://localhost:5000/trainer/api',
});