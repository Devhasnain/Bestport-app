import colors from '@config/Colors';
import {navigate, navigationRef} from '@navigation/NavigationService';
import {getToken, setToken, setUser} from '@store/authSlice';
import {getUserProfile} from '@utils/getUserProfile';
import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, View, InteractionManager} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

type Props = {
  children: ReactNode;
  navigationReady: boolean;
};

const authRoutes = ['Login', 'Register', 'Welcome'];

const AuthManager = ({children, navigationReady}: Props) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const navigation = navigationRef.current;
  const currentRouteName = navigation?.getCurrentRoute()?.name ?? '';
  const isAuthRoute = authRoutes.includes(currentRouteName);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<any>(null);

  const authenticateUser = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const user = await getUserProfile();
      if (user) {
        navigate('App');
      }
    } catch (error) {
      setLoading(false);
      dispatch(setToken(null));
      dispatch(setUser(null));
      if (!isAuthRoute) {
        navigate('Welcome');
      }
    } finally {
      HideSplashScreen();
      setLoading(false);
    }
  }, [token, navigationReady]);

  const HideSplashScreen = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      timeoutRef.current = setTimeout(() => {
        RNBootSplash.hide({fade: true});
      }, 1500);
    });
  }, []);

  useEffect(() => {
    if (!navigationReady) return;

    const handleAuthFlow = async () => {
      if (token) {
        await authenticateUser();
      } else {
        HideSplashScreen();
        if (!isAuthRoute) {
          navigate('Welcome');
        }
      }
    };

    handleAuthFlow();
  }, [token, navigationReady]);

  return (
    <>
      {children}

      {loading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 999,
          }}>
          <ActivityIndicator
            color={colors.white}
            size={'large'}
            style={{zIndex: 99}}
          />
        </View>
      )}
    </>
  );
};

export default memo(AuthManager);
