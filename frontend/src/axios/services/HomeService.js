import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosClientInstance,
  axiosAdminInstance,
  axiosTrainerInstance
} from '../axios';

export const clientRegister = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post('/clientRegister', value, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTP = async (values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post(`/verifyOTP/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserValid = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.get(`/forgotPassword/${id}/${token}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setNewPassword = async (token, id, values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post(`/changePassword/${id}/${token}`, values, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const resendOTP = async (values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post('/resendOTP', values, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendResetLink = async (values) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post('/resetLink', values, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = (formData) => axiosClientInstance.post('/clientLogin', formData)

export const userLogin = createAsyncThunk('user/userLogin', async ({ values, navigate, toast }, { rejectWithValue }) => {

  try {
    const response = await login(values)
    toast.success('Login Successful')
    navigate('/')
    return response.data

  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const adminSignin = (formData) => axiosAdminInstance.post('/adminLogin', formData)

export const adminLogin = createAsyncThunk('admin/adminLogin', async ({ values, navigate, toast }, { rejectWithValue }) => {

  try {
    const response = await adminSignin(values)
    toast.success('Login Successful')
    navigate('/admin')
    return response.data

  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const trainerRegister = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosTrainerInstance.post('/trainerRegister', value, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainerList = async () => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer `,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.get('/trainerList', config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainerDetail = async (id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer `,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.get(`/trainerDetail/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainerToCheckAvailable = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.get(`/trainerCheckAvailable/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CheckAvailability = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post(`/checkAvailability/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const placeBooking = async (token, trainerData, userId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post(`/payment/${userId}`, trainerData, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const orderVerifyPayment = async (token, res, order) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const value = {};
  value.res = res;
  value.order = order;
  const { data } = await axiosClientInstance.post('/verifyPayment', value, config);
  if (data.status) {
    return data;
  }
};

export const getUserProfile = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.get(`/getUserProfile/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUserProfile = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.post(`/editProfile/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookings = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosClientInstance.get(`/getBookings/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelPlan = async (token, value) => {
  // const config = {
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   },
  // };
  try {
    const response = await axiosClientInstance.get('/cancelPlan', {
      params: value,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};