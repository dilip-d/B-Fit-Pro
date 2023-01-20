import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosClientInstance,
  axiosAdminInstance,
} from '../axios';

export const clientRegister = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post(
    '/clientRegister',
    value,
    config
  );
  if (data.status) {
    return data;
  }
};

// Client Login action

export const clientLogin = async (value) => {
  console.log(value);
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const { data } = await axiosClientInstance.post(
    '/clientLogin',
    value,
    config
  );
  if (data) {
    return data;
  }
};

// admin Login action

export const adminLogin = async (value) => {
  console.log(value);
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.post('/adminLogin', value, config);
  if (data) {
    return data;
  }
};

// export const adminLogin = createAsyncThunk(
//   "/adminLogin",
//   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//     console.log('in admin');
//     try {
//       const response = await axiosAdminInstance.post('/adminLogin', formValue);
//       toast.success("Login Successfully")
//       navigate('/admin');
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data)
//     }
//   })

export const trainerRegister = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosHomeInstance.post(
    '/trainerRegister',
    value,
    config
  );
  if (data.status) {
    return data;
  }
};