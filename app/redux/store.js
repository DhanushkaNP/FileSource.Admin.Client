import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});

export const useAppSelector = useSelector;
