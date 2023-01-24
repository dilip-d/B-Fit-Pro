import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { configureStore } from '@reduxjs/toolkit'
import { axiosTrainerInstance } from '../axios'

export const trainerLogin = createAsyncThunk('trainer/login', async (values, { rejectWithValue }) => {
    console.log('in api call');
    try {
      // Make API call to login
      const response = await axiosTrainerInstance.post('/trainerLogin',values)
      console.log('in frontend');
      console.log(response.data)
      
      if (response.data) {
        return response.data
      } 
    } catch (error) {
      return rejectWithValue(error.message)
    }
  })