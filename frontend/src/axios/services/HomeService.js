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
  const { data } = await axiosClientInstance.post('/clientRegister', value, config);
  if (data.status) {
    return data;
  }
};

export const verifyOTP = async (values, id) => {
  console.log('in verify otp')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post(`/verifyOTP/${id}`, values, config);
  if (data) {
    return data;
  }
};

export const getUserValid = async (token, id) => {
  console.log('in user valid')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.get(`/forgotPassword/${id}/${token}`, config);
  if (data) {
    return data;
  }
};

export const setNewPassword = async (token, id, values) => {
  console.log('in set password')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post(`/changePassword/${id}/${token}`, values, config);
  if (data) {
    return data;
  }
};


export const resendOTP = async (values) => {
  console.log('in resend otp')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post('/resendOTP', values, config);
  if (data) {
    return data;
  }
};

export const sendResetLink = async (values) => {
  console.log('send reset link')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post('/resetLink', values, config);
  if (data) {
    return data;
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
  const { data } = await axiosTrainerInstance.post('/trainerRegister', value, config);
  if (data.status) {
    return data;
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
  const { data } = await axiosClientInstance.get('/trainerList', config);
  if (data) {
    return data;
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
  const { data } = await axiosClientInstance.get(`/trainerDetail/${id}`, config);
  if (data) {
    return data;
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
  const { data } = await axiosClientInstance.get(`/trainerCheckAvailable/${id}`, config);
  if (data) {
    return data;
  }
};

export const CheckAvailability = async (token, values, id) => {
  console.log('in check availability');
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post(`/checkAvailability/${id}`, values, config);
  if (data) {
    return data;
  }
};

export const placeBooking = async (token, trainerData, userId) => {
  console.log('in booking');
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post(`/payment/${userId}`, trainerData, config);
  if (data) {
    return data;
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
  console.log('in get user profile')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axiosClientInstance.get(`/getUserProfile/${id}`, config);
    if (data) {
      return data;
    }
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
  const { data } = await axiosClientInstance.post(`/editProfile/${id}`, values, config);
  if (data) {
    return data;
  }
};

export const getBookings = async (token, id) => {
  console.log('in get bookings')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.get(`/getBookings/${id}`, config);
  if (data) {
    return data;
  }
};

export const cancelPlan = async (token, id) => {
  console.log('in cancel plan')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.get(`/cancelPlan/${id}`, config);
  if (data) {
    return data;
  }
};