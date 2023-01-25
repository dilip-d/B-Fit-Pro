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