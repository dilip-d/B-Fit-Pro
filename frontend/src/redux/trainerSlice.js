import { createSlice } from '@reduxjs/toolkit';
import { trainerLogin } from '../axios/services/TrainerService';

const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    trainer: null,
    success: null,
    error: null,
    pending: null
  },
  reducers: {
    resetError: (state) => {
      state.error = null
    },
    setLogout: (state, action) => {
      localStorage.removeItem('trainer')
      state.trainer = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(trainerLogin.pending, (state) => {
        state.pending = true
      })
      .addCase(trainerLogin.fulfilled, (state, action) => {
        console.log('hii')
        state.pending = false
        localStorage.setItem("trainer", JSON.stringify({ ...action.payload }))
        state.trainer = action.payload
        state.success = action.payload
      })
      .addCase(trainerLogin.rejected, (state, action) => {
        console.log('in slice error');
        state.pending = false
        state.error = action.payload.message
      })
  }
})

export const { resetError, setLogout } = trainerSlice.actions
export default trainerSlice.reducer