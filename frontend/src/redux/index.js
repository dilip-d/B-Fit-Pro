import {combineReducers} from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import adminAuthReducer from './adminSlice'
import trainerLoginSlice from '../redux/trainerSlice';

export default combineReducers({
        auth: AuthReducer,
        adminAuth: adminAuthReducer,
        trainerLogin: trainerLoginSlice
})

