import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  values: {
    isAuth: false,
    userId: null,
    token: null,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("authData");
      return initialState;
    },

    logIn: (state, action) => {
      const { token, userId, expirationTime } = action.payload;
      localStorage.clear();
      localStorage.setItem(
        "authData",
        JSON.stringify({ token, userId, expirationTime })
      );
      return {
        values: {
          isAuth: true,
          userId: userId,
          token: token,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
