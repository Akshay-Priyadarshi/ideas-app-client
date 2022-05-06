import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../customs/login";

interface AuthState {
    loginData: LoginResponse | undefined;
}

const initialAuthState: AuthState = {
    loginData: undefined,
};

const authSlice = createSlice({
    initialState: initialAuthState,
    name: "auth",
    reducers: {
        logout: (state) => {
            state.loginData = undefined;
        },
        login: (state, action: PayloadAction<LoginResponse>) => {
            state.loginData = action.payload;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
