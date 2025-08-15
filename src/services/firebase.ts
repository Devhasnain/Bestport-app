import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { AppState, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { navigate } from '@navigation/NavigationService';
import DeviceInfo from 'react-native-device-info';
import baseApi, { endpoints } from '@api/index';
import { store } from '@store/index';
import { isIOS } from '@rneui/base';


/**
 * Request user permission for notifications (iOS only).
 */

export const requestUserPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      return enabled;
    } else {
      // For Android 13+ (API 33), request notification permission
      if (Number(Platform.Version) >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    }
  } catch (error) {
    console.log('Notification permission error:', error);
    return false;
  }
};

/**
 * Get the FCM token for the device.
 */
export const getFcmToken = async (): Promise<string | null> => {
  try {
    const isPermission = await requestUserPermission();
    if (Platform.OS === 'ios') {
      if (messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
    }
    if (isPermission) {

      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        return token;
      } else return null
    } else {
      return null;
    }
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
    const device_id = await DeviceInfo.getUniqueId();
    const app_version = DeviceInfo.getVersion();
    const os_version = DeviceInfo.getSystemVersion();
    const device_type = Platform.OS;
    const brand = DeviceInfo.getBrand();
    const device_name = await DeviceInfo.getDeviceName();
    const ip_address = await DeviceInfo.getIpAddress();

    const response = await baseApi.put(endpoints.registerDevice, {
      fcm_token: token,
      device_id,
      app_version,
      os_version,
      device_type,
      brand,
      device_name,
      ip_address
    }, { headers: { Authorization: `Bearer ${store.getState().auth.token}` } });
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
  if (isIOS && !messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'Foreground MSG11');
    notifeeHandler(remoteMessage);
  });
};
//Background notifications listeners
export const onBackGroundListener = async () => {
  if (isIOS && !messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
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
  
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      smallIcon: 'ic_stat_ic_notification',
      showTimestamp:true,
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
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
  if (AppState.currentState !== "active") {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      handleNotificationEvents(type, detail);
    });
  }
};
//Nofitication handler when user press or cancel
const handleNotificationEvents = (type: any, detail: any) => {
  const screen = detail?.notification?.data?.redirect?.split("_")[0];
  const id = detail?.notification?.data?.redirect?.split("_")[1];
  switch (type) {
    case EventType.DISMISSED:
      navigate("App");
      break;
    case EventType.PRESS:
      navigate(screen, { id });
      break;
  }
};