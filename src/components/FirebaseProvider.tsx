import {memo, ReactNode, useEffect} from 'react';
import {
  requestUserPermission,
  getFcmToken,
  sendFcmTokenToServer,
  onForeGroundListener,
  onBackGroundListener,
  onForeGroundNotification,
  onBackGroundNotification,
} from '@services/firebase';
import {useSelector} from 'react-redux';
import {getToken} from '@store/authSlice';

type Props = {
  children: ReactNode;
};

const FirebaseProvider = ({children}: Props) => {
  const token = useSelector(getToken);

  useEffect(() => {
    const setupFCM = async () => {
      const permissionGranted = await requestUserPermission();
      if (!permissionGranted) return;

      const fcmToken = await getFcmToken();
      if (fcmToken) {
        await sendFcmTokenToServer(fcmToken);
      }

      await onForeGroundListener();
      await onBackGroundListener();
      await onForeGroundNotification();
      await onBackGroundNotification();
    };
    if (token) {
      setupFCM();
    }
  }, [token]);
  return <>{children}</>;
};

export default memo(FirebaseProvider);
