import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation:"fade_from_bottom"
};

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <RootStack.Navigator 
    // initialRouteName="AuthStack"
    >
      <RootStack.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="AuthStack"
        component={AuthStack}
        options={defaultScreenOptions}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
