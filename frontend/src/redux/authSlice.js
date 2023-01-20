import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: '',
        loading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.removeItem("token");
            state.user = null;
        }
    }
})

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;