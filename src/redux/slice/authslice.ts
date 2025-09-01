import type { TROLE } from "@/constant/role";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the ROLE type or enum

interface AuthState {
  role: TROLE;
  email: string | null;
  loggedIn: boolean;
}
const initialState: AuthState = {
  role: null,
  email: null,
  loggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ role: TROLE; email: string }>) => {
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.loggedIn = true;
    },
    clearUser: (state) => {
      state.role = null;
      state.email = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
