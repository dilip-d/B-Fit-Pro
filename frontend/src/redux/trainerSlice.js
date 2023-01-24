import { createSlice } from '@reduxjs/toolkit';
import { trainerLogin} from '../axios/services/TrainerService';

const trainerSlice = createSlice({
    name: 'trainerLogin',
    initialState: {
      token: null,
      success: null,
    //   trainerDetails: null,
      error: null,
      pending: null
    },
    reducers: {
      resetError: (state) => {
        state.error = null
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(trainerLogin.pending, (state) => {
          state.pending = true
        })
        .addCase(trainerLogin.fulfilled, (state, action) => {
            console.log(action.payload)
          state.token = action.payload.token
        //   state.trainerDetails = action.payload.trainerDetails
        state.success = action.payload.status
          state.pending = false
        })
        .addCase(trainerLogin.rejected, (state, action) => {
          state.error = action.payload
          state.pending = false
        })
    }
  })

export const { resetError } = trainerSlice.actions
export default trainerSlice.reducer