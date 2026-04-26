import { store } from '@store/index';

import endpoints from '../api/endpoints';
import baseApi from '../api/index';


export const setUserOfflineOnLogout = async () => {
    const state = store.getState();
    const token = state.auth?.token;

    if (!token) {
      throw new Error('Token is missing');
    }

    await baseApi.put(endpoints.toggleOnline, {is_online: false}, {
      headers: {Authorization: `Bearer ${token}`},
    });
};
