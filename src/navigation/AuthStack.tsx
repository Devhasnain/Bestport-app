import { createNativeStackNavigator, NativeStackNavigationOptions, } from '@react-navigation/native-stack';
import Welcome from '@screens/welcome/Welcome';
import SignUp from '@screens/signup/SignUp';
import Login from '@screens/login/Login';
import { isIOS } from '@rneui/base';
import React from 'react';


const AuthenticationStack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{animation: isIOS? "none": 'fade_from_bottom'}}>
      <AuthenticationStack.Screen
        name="Welcome"
        component={Welcome}
        options={defaultScreenOptions}
      />
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
