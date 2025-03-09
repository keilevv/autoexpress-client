// In your store.js or a new employeesSlice.js file
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    production: {
      mainTab: "jobs",
      subTab: "current",
    },
    inventory: {
      mainTab: "storage",
    },
  },
  reducers: {
    setProductionSubTab: (state, action) => {
      state.production.subTab = action.payload;
    },
  },
});

export const { setProductionSubTab } = uiSlice.actions;
export default uiSlice.reducer;
