import { CustomerSupport, SetNewPassword, ForgetPassword, PrivacyPolicy, EditPassword, EmployeeProfile, VerifyOtp, ReviewJob, JobDetail, CreateJob, ProductDetail, EditEmail, EditName, Welcome, CompleteJob, SignUp, Login, Faqs, } from '@/screens/index';
import { createNativeStackNavigator, NativeStackNavigationOptions, } from '@react-navigation/native-stack';
import { BackgroundImgContainer, isIOS, PageSkeleton } from '@/components/index';
import React, { Suspense } from 'react';

import BottomTabNavigator from './BottomTabNavigator';


const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: 'transparent',
  },
  animation: isIOS ? 'none' : 'fade',
};

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <BackgroundImgContainer>
      <Suspense fallback={<PageSkeleton />}>
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
            name="EmployeeProfile"
            component={EmployeeProfile}
            options={defaultScreenOptions}
          />
          <RootStack.Screen
            name="CompleteJob"
            component={CompleteJob}
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
          <RootStack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={defaultScreenOptions}
          />
          <RootStack.Screen
            name="VerifyOtp"
            component={VerifyOtp}
            options={defaultScreenOptions}
          />
          <RootStack.Screen
            name="Product"
            component={ProductDetail}
            options={defaultScreenOptions}
          />
          <RootStack.Screen
            name="SetNewPassword"
            component={SetNewPassword}
            options={defaultScreenOptions}
          />
          <RootStack.Screen
            name="ReviewJob"
            component={ReviewJob}
            options={defaultScreenOptions}
          />
        </RootStack.Navigator>
      </Suspense>
    </BackgroundImgContainer>
  );
};

export default RootNavigation;
