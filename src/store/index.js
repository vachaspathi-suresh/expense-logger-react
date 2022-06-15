import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";

const store = configureStore({ reducer: { filter: filterSlice } });

export default store;
