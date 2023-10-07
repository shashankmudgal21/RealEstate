import { configureStore,combineReducers } from '@reduxjs/toolkit'
import  userReducer from './user/userSlice.js'
export const store = configureStore({
  reducer: {user:userReducer},
  middleware:(getDefaultMiddleWare) => getDefaultMiddleWare({
    serializableCheck:false,
  }),
})