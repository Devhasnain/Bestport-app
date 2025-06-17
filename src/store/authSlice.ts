import { createSlice } from '@reduxjs/toolkit';
import { User } from "../types/user";
import { RootState } from '@store/index';


type InitialStateType = {
    user: User | null;
    token: string | null
}

const initialState: InitialStateType = {
    user: null,
    token: null,
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
    },
});

export const {
    setToken,
    setUser,
    logout,
    updateUser,
} = authSlice?.actions;

export const getUser = (state: RootState) => state?.auth?.user;
export const getToken = (state: RootState) => state?.auth?.token;

export default authSlice.reducer;
