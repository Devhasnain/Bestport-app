import { initFCMListeners } from '@/services/firebase';
import { memo, ReactNode, useEffect } from 'react';
import { getToken } from '@/store/authSlice';
import { useSelector } from 'react-redux';

import { useAuthStore } from '../store';


type Props = {
  children: ReactNode;
};

export const FirebaseProvider = memo(({children}: Props) => {
  const token = useAuthStore((state)=>state.accessToken);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (token) {
      initFCMListeners()
        .then(unsub => {
          cleanup = unsub;
        })
        .catch(err => {
          console.error('Error initializing FCM:', err);
        });
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [token]);

  return <>{children}</>;
});
