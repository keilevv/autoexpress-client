// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import { thunk } from 'redux-thunk';
// reducers
import authSlice from './reducers/authSlice';

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
  reducer: { auth: persistedReducer },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: () => { return [thunk] }
});

export const persistor = persistStore(store)

