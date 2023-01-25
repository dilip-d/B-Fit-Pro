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

export const login = (formData) => axiosClientInstance.post('/clientLogin', formData)

export const userLogin = createAsyncThunk('user/userLogin', async ({ values, navigate, toast }, { rejectWithValue }) => {
  console.log('in api call');

  try {
    const response = await login(values)
    console.log('in frontend');
    console.log(response.data)
    toast.success('Login Successful')
    navigate('/')
    return response.data

  } catch (error) {
    console.log('in catch');
    return rejectWithValue(error.response.data)
  }
})

// export const clientLogin = async (value) => {
//   console.log(value);
//   const config = {
//     headers: {
//       'content-type': 'application/json',
//     },
//   };
//   const { data } = await axiosClientInstance.post(
//     '/clientLogin',
//     value,
//     config
//   );
//   if (data) {
//     return data;
//   }
// };


// admin Login action

export const adminSignin = (formData) => axiosAdminInstance.post('/adminLogin', formData)

export const adminLogin = createAsyncThunk('admin/adminLogin', async ({ values, navigate, toast }, { rejectWithValue }) => {
  console.log('in api call');

  try {
    const response = await adminSignin(values)
    console.log('in frontend');
    console.log(response.data)
    toast.success('Login Successful')
    navigate('/admin')
    return response.data

  } catch (error) {
    console.log('in catch');
    return rejectWithValue(error.response.data)
  }
})

export const trainerRegister = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosTrainerInstance.post(
    '/trainerRegister',
    value,
    config
  );
  if (data.status) {
    return data;
  }
};

// Trainer Login action
// export const trainerLogin = async (value) => {
//   console.log(value);
//   const config = {
//     headers: {
//       'content-type': 'application/json',
//     },
//   };
//   const { data } = await axiosTrainerInstance.post(
//     '/trainerLogin',
//     value,
//     config
//   );
//   if (data) {
//     return data;
//   }
// };