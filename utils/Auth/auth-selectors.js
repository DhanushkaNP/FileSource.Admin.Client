"use client";

import { useAppSelector } from "@/app/redux/store";

export const useUserId = () =>
  useAppSelector((state) => state.authReducer.values.userId);
export const useUserToken = () =>
  useAppSelector((state) => state.authReducer.values.token);
export const useIsAuth = () =>
  useAppSelector((state) => state.authReducer.values.isAuth);
