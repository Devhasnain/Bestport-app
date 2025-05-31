import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import colors from '@config/Colors';

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
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={appTheme}>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
