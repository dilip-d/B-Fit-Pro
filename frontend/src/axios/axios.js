import axios from 'axios';

export const axiosClientInstance = axios.create({ baseURL: 'http://localhost:5000/api' });
export const axiosAdminInstance = axios.create({ baseURL: 'http://localhost:5000/admin/api' });
export const axiosTrainerInstance = axios.create({ baseURL: 'http://localhost:5000/trainer/api' });
export const axiosConversationInstance = axios.create({ baseURL: "http://localhost:5000/conversations/api" });
export const axiosMessageInstance = axios.create({ baseURL: "http://localhost:5000/messages/api" });

// export const axiosClientInstance = axios.create({baseURL:"https://bfitprobackend.onrender.com/api"});
// export const axiosAdminInstance = axios.create({baseURL:"https://bfitprobackend.onrender.com/admin/api"});
// export const axiosTrainerInstance = axios.create({baseURL:"https://bfitprobackend.onrender.com/trainer/api"});
// export const axiosConversationInstance = axios.create({baseURL:"https://bfitprobackend.onrender.com/conversations/api"});
// export const axiosMessageInstance = axios.create({baseURL:"https://bfitprobackend.onrender.com/messages/api"});