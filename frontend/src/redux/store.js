import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
// import AuthReducer from './features/authSlice';
// import adminAuthReducer from './features/adminSlice'

// export default configureStore({
//     reducer:{
//         auth: AuthReducer,
//         adminAuth: adminAuthReducer
//     }
// })

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import reducers from '../redux/index.js';

const persistConfig = { key: 'root', storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});