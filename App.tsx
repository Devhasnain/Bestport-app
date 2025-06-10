import React, {useCallback, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import colors from '@config/Colors';
import {StatusBar} from 'react-native';
import {navigationRef} from '@navigation/NavigationService';

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

  const handleOnReady = useCallback(() => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
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
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <NavigationContainer
          theme={appTheme}
          ref={navigationRef}
          onReady={handleOnReady}
          onStateChange={handleOnStateChange}
          >
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
