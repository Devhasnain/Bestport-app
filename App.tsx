import { AuthManager, ReportErrorModel, NetworkAware, CustomAlert, StatusBar, } from '@/components/index';
import { getCurrentRouteName, navigationRef, } from '@/navigation/NavigationService';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryProvider, FirebaseProvider } from '@/providers/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ErrorBoundary from 'react-native-error-boundary';
import React, { useRef, useState } from 'react';
import { colors } from '@/config/index';

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
  const routeNameRef = useRef<string | undefined>(undefined);

  const [navigationReady, setNavigationReady] = useState(false);

  /**
   * Navigation Ready
   */
  const handleOnReady = () => {
    if (navigationRef.isReady()) {
      routeNameRef.current = getCurrentRouteName();
      setNavigationReady(true);
    }
  };

  /**
   * Navigation State Change
   */
  const handleOnStateChange = () => {
    if (navigationRef.isReady()) {

      const currentRouteName = getCurrentRouteName();

      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <QueryProvider>
      <ErrorBoundary FallbackComponent={ReportErrorModel}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <NavigationContainer
                ref={navigationRef}
                theme={appTheme}
                onReady={handleOnReady}
                onStateChange={handleOnStateChange}>
                <AuthManager navigationReady={navigationReady}>
                  <FirebaseProvider>
                    <CustomAlert />

                    <RootNavigation />
                  </FirebaseProvider>
                </AuthManager>
              </NavigationContainer>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>

        <NetworkAware />
      </ErrorBoundary>
    </QueryProvider>
  );
};

export default App;
