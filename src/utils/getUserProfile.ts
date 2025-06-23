import baseApi from '../api/index';
import {setUser} from '@store/authSlice';
import {store} from '@store/index';
import endpoints from '../api/endpoints';

export const getUserProfile = async () => {
  try {
    const state = store.getState();
    const token = state.auth?.token;

    if (!token) {
      throw new Error('Token is missing');
    }

    const res = await baseApi.get(endpoints.profile, {
      headers: {Authorization: `Bearer ${token}`},
    });

    store.dispatch(setUser(res?.data?.data?.user));
    return res?.data?.data?.user
  } catch (error) {
    console.error('Failed to fetch profile completion:', error);
  }
};
