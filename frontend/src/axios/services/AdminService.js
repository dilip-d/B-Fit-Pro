import { axiosAdminInstance } from '../axios';

export const getUserInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get('/userInfo', config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unBlockUser = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/unBlockuserinfo/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const blockUser = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/blockUserinfo/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getActiveTrainerInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get('/activeTrainerInfo', config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const blockTrainer = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/blockTrainer/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unBlockTrainer = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/unBlockTrainer/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainerdetails = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get('/getTrainerDetails', config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const trainerReject = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/trainerReject/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const trainerApproval = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/trainerApproval/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookingInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get('/bookingInfo', config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDetails = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosAdminInstance.get('/getAllDetails', config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}