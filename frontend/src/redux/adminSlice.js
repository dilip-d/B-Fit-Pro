import { createSlice } from '@reduxjs/toolkit';
import { adminLogin } from '../axios/services/HomeService';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        trainer: null,
        success: null,
        error: null,
        pending: false
    },
    reducers: {
        setAdminLogout: (state, action) => {
            localStorage.removeItem("admin");
            state.admin = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.pending = true
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.pending = false
                localStorage.setItem("admin", JSON.stringify({ ...action.payload }))
                state.admin = action.payload
                state.success = action.payload
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.pending = false
                state.error = action.payload.message
            })
    }
})

export const { setAdmin, setAdminLogout } = adminSlice.actions;

export default adminSlice.reducer;