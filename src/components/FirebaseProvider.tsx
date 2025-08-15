import { requestUserPermission, getFcmToken, sendFcmTokenToServer, onForeGroundListener, onBackGroundListener, onForeGroundNotification, onBackGroundNotification, } from '@services/firebase';
import { memo, ReactNode, useEffect, useRef } from 'react';
import { getToken } from '@store/authSlice';
import { useSelector } from 'react-redux';


type Props = {
  children: ReactNode;
};

const FirebaseProvider = ({ children }: Props) => {
  const token = useSelector(getToken);
  const listenersAttached = useRef(false);

  useEffect(() => {
    let foregroundMsgUnsub: any;
    let foregroundNotifUnsub: any;
    let backgroundNotifUnsub: any;

    const setupFCM = async () => {
      if (listenersAttached.current) return; // Prevent multiple registrations
      listenersAttached.current = true;

      const permissionGranted = await requestUserPermission();
      if (!permissionGranted) return;

      const fcmToken = await getFcmToken();
      if (fcmToken) {
        await sendFcmTokenToServer(fcmToken);
      }

      // Register notification listeners
      foregroundMsgUnsub = onForeGroundListener();
      onBackGroundListener(); // Background handler doesn't need unsubscribe
      foregroundNotifUnsub = onForeGroundNotification();
      backgroundNotifUnsub = onBackGroundNotification();
    };

    if (token) {
      setupFCM();
    }

    return () => {
      // Clean up listeners when component unmounts
      if (foregroundMsgUnsub) foregroundMsgUnsub();
      if (foregroundNotifUnsub) foregroundNotifUnsub();
      if (backgroundNotifUnsub) backgroundNotifUnsub();
    };
  }, [token]);

  return <>{children}</>;
};

export default memo(FirebaseProvider);
