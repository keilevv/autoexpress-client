// In your store.js or a new employeesSlice.js file
import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employeeList: null,
  },
  reducers: {
    setEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
  },
});

export const { setEmployeeList } = employeesSlice.actions;
export default employeesSlice.reducer;
