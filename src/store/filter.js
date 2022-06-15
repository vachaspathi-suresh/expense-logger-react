import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredYear: new Date().getFullYear(),
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilteredYear(state, action) {
      state.filteredYear = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
