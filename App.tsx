import { AuthManager, ReportErrorModel, NetworkAware } from '@components/index';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FirebaseProvider from '@components/FirebaseProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { navigationRef } from '@navigation/NavigationService';
import React, { useCallback, useRef, useState } from 'react';
import SocketProvider from '@components/SocketProvider';
import ErrorBoundary from 'react-native-error-boundary';
import { persistor, store } from '@store/index';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import colors from '@config/Colors';

import { OnlineUsersProvider } from './src/context/OnlineUsersContext';
import RootNavigation from './src/navigation';


const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: colors.primaryText,
    primary: colors.primary,
    background: colors.white,
  },
};

const App = () => {
  const routeNameRef = useRef(null);
  const [navigationReady, setNavigationReady] = useState(false);

  const handleOnReady = useCallback(() => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    setNavigationReady(true);
  }, []);
  const handleOnStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    if (previousRouteName !== currentRouteName) {
    }
    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <>
      <ErrorBoundary FallbackComponent={ReportErrorModel}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  <NavigationContainer
                    theme={appTheme}
                    ref={navigationRef}
                    onReady={handleOnReady}
                    onStateChange={handleOnStateChange}>
                    <AuthManager navigationReady={navigationReady}>
                      <FirebaseProvider>
                        <OnlineUsersProvider>
                          <SocketProvider>
                            <RootNavigation />
                          </SocketProvider>
                        </OnlineUsersProvider>
                      </FirebaseProvider>
                    </AuthManager>
                  </NavigationContainer>
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
        <NetworkAware />
      </ErrorBoundary>
    </>
  );
};

export default App;
