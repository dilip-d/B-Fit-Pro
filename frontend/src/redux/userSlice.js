import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../axios/services/HomeService';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
        pending: false,
        success: null,
        selectedTrainerdetails: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.removeItem("user");
            state.user = null;
            state.error = null;
        },
        getSelectedTrainerDetails: (state, action) => {
            let { selectedTrainerdetails } = state;

            selectedTrainerdetails = action.payload;

            return { ...state, selectedTrainerdetails };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.pending = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log('hii')
                state.pending = false
                localStorage.setItem("user", JSON.stringify({ ...action.payload }))
                state.user = action.payload
                state.success = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log('in slice error');
                state.pending = false
                state.error = action.payload.message
            })
        // .addCase(userRegister.pending, (state) => {
        //     state.pending = true
        // })
        // .addCase(userRegister.fulfilled, (state, action) => {
        //     console.log('hii')
        //     state.pending = false
        //     state.user = action.payload
        //     state.success = action.payload
        // })
        // .addCase(userRegister.rejected, (state, action) => {
        //     console.log('in slice error');
        //     state.pending = false
        //     state.error = action.payload.message
        // })
    }
})

export const { setUser, setLogout, getSelectedTrainerDetails } = userSlice.actions;

export default userSlice.reducer;