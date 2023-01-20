import { axiosAdminInstance } from '../axios';

export const getUserInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/userInfo', config);

  if (data.status) {
    // console.log(data.status);
    return data;
  }
};

export const unBlockuserinfo = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get(
    `/unBlockuserinfo/${id}`,
    config
  );
  if (data.status) {
    return data;
  }
};

export const blockunsrinfo = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosAdminInstance.get(`/blockUserinfo/${id}`, config);
  if (data.status) {
    return data;
  }
};
