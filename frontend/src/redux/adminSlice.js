import { createSlice } from '@reduxjs/toolkit';
import { adminLogin } from '../axios/services/HomeService';

const initialState = {
    admin: null,
    token: null,
    error: '',
    loading: false,
    currentPage: 'dashbord',
};

const adminAuthSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        setAdminLogout: (state, action) => {
            localStorage.removeItem("Admintoken");
            state.admin = null;
        },
        // changePage: (state, action) => {
        //     state.currentPage = action.payload;
        // },
    },
    extraReducers: {
        [adminLogin.pending]: (state, action) => {
            state.loading = true
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("admin", JSON.stringify({ ...action.payload }));
            state.admin = action.payload
        },
        [adminLogin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        }
    }
})

export const { setAdmin, setAdminLogout} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;