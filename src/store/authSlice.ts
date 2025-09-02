import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

import { User } from "../types/user";


type InitialStateType = {
    user: User | null;
    token: string | null
    alert: any
}

const initialState: InitialStateType = {
    user: null,
    token: null,
    alert: null
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action?.payload;
        },
        setUser: (state, action) => {
            state.user = action?.payload;
        },
        logout: state => {
            state.user = null;
            state.token = null;
        },
        updateUser: (state, action) => {
            if (state?.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        hideAlert: (state) => {
            state.alert = null
        }
    },
});

export const {
    setToken,
    setUser,
    logout,
    updateUser,
    setAlert,
    hideAlert
} = authSlice?.actions;

export const getUser = (state: RootState) => state?.auth?.user;
export const getToken = (state: RootState) => state?.auth?.token;
export const isAlertExists = (state: RootState) => state.auth.alert

export default authSlice.reducer;
