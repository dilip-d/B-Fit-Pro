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
    const data = await axiosConversationInstance.get('/' + userid, config)
    if (data) {
      return data
    }
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
  const { data } = await axiosConversationInstance.get('/trainerDetails/' + trainerId, config);
  if (data) {
    return data;
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
  const { data } = await axiosConversationInstance.get('/userdetails/' + userId, config);
  if (data) {
    return data;
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
  const { data } = await axiosConversationInstance.post('/', { userid, trainerId, config })
  if (data) {
    return data
  }
}

export const getVideoConversation = async (id,userId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const {data} = await axiosConversationInstance.get(`/videoConversation/${id}/${userId}`, config)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err);
  }
}
