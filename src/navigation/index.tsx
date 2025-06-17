import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Welcome from '@screens/welcome/Welcome';
import Login from '@screens/login/Login';
import SignUp from '@screens/signup/SignUp';
import CreateJob from '@screens/createJob/CreateJob';
import Faqs from '@screens/faqs/Faqs';
import JobDetail from '@screens/jobDetail/JobDetail';

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation:"fade_from_bottom"
};

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName='Welcome'>
      <RootStack.Screen
        name="App"
        component={BottomTabNavigator}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="CreateJob"
        component={CreateJob}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="JobDetail"
        component={JobDetail}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="Faqs"
        component={Faqs}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="Welcome"
        component={Welcome}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="Login"
        component={Login}
        options={defaultScreenOptions}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUp}
        options={defaultScreenOptions}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
