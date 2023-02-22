import axios from 'axios';

export const axiosClientInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});
export const axiosAdminInstance = axios.create({
  baseURL: 'http://localhost:5000/admin/api',
});
export const axiosTrainerInstance = axios.create({
  baseURL: 'http://localhost:5000/trainer/api',
});
// export const axiosChatInstance = axios.create({
//   baseURL: 'http://localhost:5000/chat/api',
// })
export const axiosConversationInstance = axios.create({
  baseURL: "http://localhost:5000/conversations/api"
});
export const axiosMessageInstance = axios.create({
  baseURL: "http://localhost:5000/messages/api"
});


// export const axiosClientInstance = axios.create({baseURL:"https://18.183.75.134/api"});
// export const axiosAdminInstance = axios.create({baseURL:"https://18.183.75.134/admin/api"});
// export const axiosTrainerInstance = axios.create({baseURL:"https://18.183.75.134/trainer/api"});
// export const axiosConversationInstance = axios.create({baseURL:"https://18.183.75.134/conversations/api"});
// export const axiosMessageInstance = axios.create({baseURL:"https://18.183.75.134/messages/api"});