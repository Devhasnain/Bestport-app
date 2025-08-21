import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';


type InitialStateType = {
    notifications: any[] | [];
}

const initialState: InitialStateType = {
    notifications: []
};
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action?.payload;
        },
        addNotification: (state, action) => {
            state.notifications = [action?.payload, ...state.notifications];
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter((item) => item?._id !== action.payload)
        },
        readNotification: (state, action) => {
            state.notifications = state.notifications.map((item) => {
                if (item?._id === action.payload) {
                    return {
                        ...item,
                        is_read: true
                    }
                } else {
                    return item
                }
            }).sort((a:any, b:any) => {
                if (a.is_read !== b.is_read) {
                    return a.is_read ? 1 : -1;
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        }
    },
});

export const {
    setNotifications,
    addNotification,
    removeNotification,
    readNotification
} = notificationSlice?.actions;

export const getNotifications = (state: RootState) => state?.notification?.notifications;

export default notificationSlice.reducer;
