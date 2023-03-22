import { axiosConversationInstance } from '../axios'

export const getConversations = async (userid) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosConversationInstance.get('/' + userid, config)
    return response;
  } catch (err) {
    console.log(err);
  }
}

export const trainerDetails = async (trainerId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosConversationInstance.get('/trainerDetails/' + trainerId, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userDetails = async (userId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosConversationInstance.get('/userdetails/' + userId, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postConversation = async (userid, trainerId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosConversationInstance.post('/', { userid, trainerId, config })
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export const getVideoConversation = async (id, userId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosConversationInstance.get(`/videoConversation/${id}/${userId}`, config)
    return response.data
  } catch (err) {
    console.log(err);
  }
}
