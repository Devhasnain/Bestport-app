import baseApi from '@api/index';
import { store } from '@store/index';
import { useState } from 'react';

type RequestProps = {
  payload?: any;
  token?: string | null;
  path?: string | null;
  headers?: any
}

export const usePost = (endpoint?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  const request = async ({ payload = {}, token = null, path = null, headers = {} }: RequestProps) => {
    setLoading(true);
    setError(null);

    try {
      const response = await baseApi.post(path ? path : endpoint ?? "", payload, {
        headers: { Authorization: `Bearer ${token ?? store.getState()?.auth?.token}`, ...headers },
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data ?? err);
      throw err.response?.data ?? err;
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => setData(null);

  return { request, loading, error, data, clearData };
};
