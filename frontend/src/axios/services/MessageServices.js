import { axiosMessageInstance } from '../axios'

export const getMessages = async (conversationId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosMessageInstance.get('/' + conversationId, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postMessages = async (message) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosMessageInstance.post('/', message, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};