import { initFCMListeners } from '@services/firebase';
import { memo, ReactNode, useEffect } from 'react';
import { getToken } from '@store/authSlice';
import { useSelector } from 'react-redux';


type Props = {
  children: ReactNode;
};

const FirebaseProvider = ({ children }: Props) => {
  const token = useSelector(getToken);

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
};

export default memo(FirebaseProvider);
