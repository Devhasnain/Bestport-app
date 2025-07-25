import { createNativeStackNavigator, NativeStackNavigationOptions, } from '@react-navigation/native-stack';
import BackgroundImgContainer from '@components/backgroundImgContainer/BackgroundImgContainer';
import CustomerSupport from '@screens/customerSupport/CustomerSupport';
import SetNewPassword from '@screens/setNewPassword/SetNewPassword';
import ForgetPassword from '@screens/forgetPassword/ForgetPassword';
import PrivacyPolicy from '@screens/privacyPolicy/PrivacyPolicy';
import EditPassword from '@screens/profile/EditPassword';
import VerifyOtp from '@screens/verifyOtp/VerifyOtp';
import JobDetail from '@screens/jobDetail/JobDetail';
import CreateJob from '@screens/createJob/CreateJob';
import EditEmail from '@screens/profile/EditEmail';
import EditName from '@screens/profile/EditName';
import Welcome from '@screens/welcome/Welcome';
import SignUp from '@screens/signup/SignUp';
import Login from '@screens/login/Login';
import Faqs from '@screens/faqs/Faqs';
import { isIOS } from '@rneui/base';
import React from 'react';

import BottomTabNavigator from './BottomTabNavigator';


const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: 'transparent',
  },
  animation: isIOS ? 'none' : "fade",
};

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <BackgroundImgContainer>
      <RootStack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <RootStack.Screen
          name="App"
          component={BottomTabNavigator}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="EditName"
          component={EditName}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="EditEmail"
          component={EditEmail}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="EditPassword"
          component={EditPassword}
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
          name="CustomerSupport"
          component={CustomerSupport}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            ...defaultScreenOptions,
            animation: isIOS ? 'none' : 'simple_push',
          }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{
            ...defaultScreenOptions,
            animation: isIOS ? 'none' : 'simple_push',
          }}
        />
        <RootStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            ...defaultScreenOptions,
            animation: isIOS ? 'none' : 'simple_push',
          }}
        />
        <RootStack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            ...defaultScreenOptions,
            animation: isIOS ? 'none' : 'simple_push',
          }}
        />
        <RootStack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{
            ...defaultScreenOptions,
            animation: isIOS ? 'none' : 'simple_push',
          }}
        />
        <RootStack.Screen
          name="SetNewPassword"
          component={SetNewPassword}
          options={{
            ...defaultScreenOptions,
            animation: isIOS ? 'none' : 'simple_push',
          }}
        />
      </RootStack.Navigator>
    </BackgroundImgContainer>
  );
};

export default RootNavigation;
