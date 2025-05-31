import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Login from '@screens/login/Login';
import SignUp from '@screens/signup/SignUp';

const AuthenticationStack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={defaultScreenOptions}
      />
      <AuthenticationStack.Screen
        name="SignUp"
        component={SignUp}
        options={defaultScreenOptions}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthStack;
