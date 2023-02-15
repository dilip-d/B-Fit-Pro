import {combineReducers} from '@reduxjs/toolkit';
import AuthReducer from './userSlice';
import adminAuthReducer from './adminSlice'
import trainerLoginSlice from '../redux/trainerSlice';
import {
        callReducer,
        myChatsReducer,
        myHelpChatsReducer,
        myRoomsReducer,
      } from "./chatReducer";

export default combineReducers({
        auth: AuthReducer,
        adminAuth: adminAuthReducer,
        trainerLogin: trainerLoginSlice,

        myRooms: myRoomsReducer,
        myChats: myChatsReducer,
        helpChats: myHelpChatsReducer,
        callVideo: callReducer,
})

