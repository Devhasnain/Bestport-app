import { useState } from 'react';

import { store } from '@store/index';
import baseApi from '@api/index';

type RequestProps = {
  payload?: any;
  token?: string | null;
  path?: string | null
}

export const usePut = (endpoint?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  const request = async ({ payload = {}, token = null, path = null }: RequestProps) => {
    setLoading(true);
    setError(null);

    try {
      const response = await baseApi.put(path ? path : endpoint ?? "", payload, {
        headers: { Authorization: `Bearer ${token ?? store.getState()?.auth?.token}` },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      console.log(err)
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => setData(null);

  return { request, loading, error, data, clearData };
};
