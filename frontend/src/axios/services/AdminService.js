import { axiosAdminInstance } from '../axios';

export const getUserInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/userInfo', config);
  if (data.status) {
    return data;
  }
};

export const unBlockuserinfo = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/unBlockuserinfo/${id}`, config);
  if (data.status) {
    return data;
  }
};

export const blockunsrinfo = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(`/blockUserinfo/${id}`, config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get('/activeTrainerInfo', config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get(`/blockTrainer/${id}`, config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get(`/unBlockTrainer/${id}`, config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get('/getTrainerDetails', config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get(`/trainerReject/${id}`, config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get(`/trainerApproval/${id}`, config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get('/bookingInfo', config);
  if (data.status) {
    return data;
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
  const { data } = await axiosAdminInstance.get('/getAllDetails', config);
  if (data) {
    return data;
  }
}