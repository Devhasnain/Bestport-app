import messaging from '@react-native-firebase/messaging';
import baseApi, { endpoints } from '@api/index';
import { store } from '@store/index';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from '@navigation/NavigationService';

/**
 * Request user permission for notifications (iOS only).
 */
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

/**
 * Get the FCM token for the device.
 */
export const getFcmToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Send the FCM token to your backend server.
 * @param token - The FCM token to send
 * @param userId - Optional user ID if you want to associate the token
 */
export const sendFcmTokenToServer = async (token: string) => {
  try {
    const response = await baseApi.put(`${endpoints.setFcm}/${token}`, {}, { headers: { Authorization: `Bearer ${store.getState().auth.token}` } });
    if (response.data?.success) {
      console.log('FCM token sent to server successfully');
    } else {
      console.warn('FCM token sent but not acknowledged by server');
    }
  } catch (error) {
    console.error('Failed to send FCM token to server:', error);
  }
};

export const onForeGroundListener = async () => {
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'Foreground MSG11');
    notifeeHandler(remoteMessage);
  });
};
//Background notifications listeners
export const onBackGroundListener = async () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage, 'Background MSG11');
    notifeeHandler(remoteMessage);
  });
};

//Notifee handler function
const notifeeHandler = async (remoteMessage: any) => {
  const { notification, data } = remoteMessage;
  const { body, title } = notification;
  // Request permissions (required for iOS)
  await notifee.requestPermission();
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      smallIcon: 'ic_stat_ic_notification',
      pressAction: {
        id: 'default',
      },
    },
  });
};
//Notifee Foreground notification listener to display
export const onForeGroundNotification = async () => {
  notifee.onForegroundEvent(async ({ type, detail }) => {
    handleNotificationEvents(type, detail);
  });
};
//Notifee Background notification listener to display
export const onBackGroundNotification = async () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    handleNotificationEvents(type, detail);
  });
};
//Nofitication handler when user press or cancel
const handleNotificationEvents = (type: any, detail: any) => {
  switch (type) {
    case EventType.DISMISSED:
      break;
    case EventType.PRESS:
      navigate('Notifications');
      break;
  }
};