import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slice/jobSlice";

export default configureStore({ reducer: { jobReducer } });
