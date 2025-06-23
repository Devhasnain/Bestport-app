import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import colors from '@config/Colors';
import {StatusBar} from 'react-native';
import {navigationRef} from '@navigation/NavigationService';
import {AuthManager, ReportErrorModel, NetworkAware} from '@components/index';
import ErrorBoundary from 'react-native-error-boundary';
import {Provider} from 'react-redux';
import {persistor, store} from '@store/index';
import {PersistGate} from 'redux-persist/integration/react';
import FirebaseProvider from '@components/FirebaseProvider';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
                        <RootNavigation />
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
