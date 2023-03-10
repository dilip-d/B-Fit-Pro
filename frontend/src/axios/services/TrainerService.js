import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosTrainerInstance } from '../axios'

export const login = (formData) => axiosTrainerInstance.post('/trainerLogin', formData)

export const trainerLogin = createAsyncThunk('trainer/trainerLogin', async ({ values, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await login(values)
    toast.success('Login Successful')
    navigate('/trainerHome')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getProfile = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.get(`/getProfile/${id}`, config);
  if (data) {
    return data;
  }
};

export const addService = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addService/${id}`, values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const addTips = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addTips/${id}`, values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const addDescription = async (token, values, id) => {
  console.log(id);
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addDescription/${id}`, values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const addPrice = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addPrice/${id}`, values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const editProfile = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/editProfile/${id}`, values, config);
  if (data) {
    return data;
  }
};

export const deleteService = async (token, value, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/deleteService/${id}`, value, config);
  if (data) {
    return data;
  }
};

export const deleteTips = async (token, value, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/deleteTip/${id}`, value, config);
  if (data) {
    return data;
  }
};

export const getTrainerBookings = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.get(`/getTrainerBookings/${id}`, config);
  if (data) {
    return data;
  }
};