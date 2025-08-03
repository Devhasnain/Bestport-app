import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

import notificationReducer from './notificationSlice';
import productsReducer from './productsSlice';
import authReducer from './authSlice';
import jobReducer from './jobSlice';


// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
    notification: notificationReducer,
    products:productsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// Persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
    stateReconciler: autoMergeLevel2,
};

// Fix typing here
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/FLUSH',
                    'persist/PURGE',
                    'persist/REGISTER',
                ],
            },
        }),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
