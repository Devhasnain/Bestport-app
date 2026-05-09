import { ActivityIndicator, InteractionManager, StyleSheet, View, } from 'react-native';
import React, { memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import { navigationRef, replace } from '@/navigation/NavigationService';
import RNBootSplash from 'react-native-bootsplash';
import { useGetProfile } from '@/hooks/index';
import { useAuthStore } from '@/store/index';
import colors from '@/config/Colors';


type Props = {
  children: ReactNode;
  navigationReady: boolean;
};

const AUTH_ROUTES = ['Login', 'Register', 'Welcome'];
const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const AuthManager = memo(({children, navigationReady}: Props) => {
  const {accessToken, isLoading, lastAuthenticated, setLoading} =
    useAuthStore();
  const {mutate: getUserProfile} = useGetProfile();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAuthRoute = AUTH_ROUTES.includes(
    navigationRef.current?.getCurrentRoute()?.name ?? '',
  );

  // ─── Splash Hide ──────────────────────────────────────────────
  const hideSplash = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      timeoutRef.current = setTimeout(() => {
        console.log('hidding splash screen')
        RNBootSplash.hide({fade: true});
      }, 1500);
    });
  }, []);

  // ─── Cleanup ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ─── Auth Flow ────────────────────────────────────────────────
  useEffect(() => {
   
    if (!navigationReady) return;

    const handleAuthFlow = async () => {
      setLoading(true);

      // Token nahi hai — Welcome par bhejo
      if (!accessToken) {
        setLoading(false);
        hideSplash();
        if (!isAuthRoute) replace('Welcome');
        return;
      }

      // Pehli baar login — profile fetch karo
      if (!lastAuthenticated) {
        getUserProfile();
        hideSplash();
        return;
      }

      // 15 min se zyada hua — revalidate karo
      const isExpired = Date.now() - lastAuthenticated > FIFTEEN_MINUTES;
      if (isExpired) {
        getUserProfile();
        hideSplash();
        return;
      }

      // Token valid hai — App mein bhejo
      replace('App');
      hideSplash();
      setLoading(false);
    };

    handleAuthFlow();
 
  }, [accessToken, navigationReady, lastAuthenticated]);
  
  return (
    <>
      {children}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator color={colors.white} size="large" />
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 999,
  },
});
