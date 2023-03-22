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
  try {
    const response = await axiosTrainerInstance.get(`/getProfile/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.post(`/addService/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.post(`/addTips/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addDescription = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosTrainerInstance.post(`/addDescription/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.post(`/addPrice/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.post(`/editProfile/${id}`, values, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.post(`/deleteService/${id}`, value, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.post(`/deleteTip/${id}`, value, config);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await axiosTrainerInstance.get(`/getTrainerBookings/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};