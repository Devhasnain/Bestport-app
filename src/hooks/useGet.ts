import { useState, useEffect, useCallback } from 'react';
import { store } from '@store/index';
import baseApi from '@api/index';


type Props = {
  endpoint: string;
  token?: string | null;
  autoFetch?: any
}

export const useGet = ({ endpoint, token, autoFetch = false }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const request = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await baseApi.get(endpoint, {
        headers: { Authorization: `Bearer ${token ?? store?.getState()?.auth?.token}` },
      });
      setData(response.data);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (autoFetch) request();
  }, [endpoint, autoFetch]);

  return { request, loading, error, data };
};
