import {combineReducers} from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import adminAuthReducer from './adminSlice'

export default combineReducers({
        auth: AuthReducer,
        adminAuth: adminAuthReducer
})