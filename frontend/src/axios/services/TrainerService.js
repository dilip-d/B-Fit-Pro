import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosTrainerInstance } from '../axios'

export const login = (formData) => axiosTrainerInstance.post('/trainerLogin', formData)

export const trainerLogin = createAsyncThunk('trainer/trainerLogin', async ({ values, navigate, toast }, { rejectWithValue }) => {
  console.log('in api call');

  try {
    const response = await login(values)
    console.log('in frontend');
    console.log(response.data)
    toast.success('Login Successful')
    navigate('/trainerHome')
    return response.data

  } catch (error) {
    console.log('in catch');
    return rejectWithValue(error.response.data)
  }
})

export const getProfile = async (token, id) => {
  console.log('in get profile')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.get(`/getProfile/${id}`, config);
  if (data) {
    return data;
  }
};

export const addService = async (values, id) => {
  console.log('in add service')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addService/${id}`,values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const addTips = async (values, id) => {
  console.log('in add tips')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addTips/${id}`,values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const addDescription = async (values, id) => {
  console.log('in add description')
  console.log(id);
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addDescription/${id}`,values, config);
  if (data) {
    console.log(data);
    return data;
  }
};

export const addPrice = async (values, id) => {
  console.log('in add price')
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(`/addPrice/${id}`,values, config);
  if (data) {
    console.log(data);
    return data;
  }
};