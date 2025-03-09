// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { thunk } from "redux-thunk";
// reducers
import authSlice from "./reducers/authSlice";
import employeesSlice from "./reducers/employeesSlice";
import uiSlice from "./reducers/uiSlice";

const persistConfig = {
  key: "root",
  storage,
};

const authReducer = persistReducer(persistConfig, authSlice);
const employeesReducer = persistReducer(persistConfig, employeesSlice);
const uiReducer = persistReducer(persistConfig, uiSlice);

export const store = configureStore({
  reducer: { auth: authReducer, employees: employeesReducer, ui: uiReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: () => {
    return [thunk];
  },
});

export const persistor = persistStore(store);
