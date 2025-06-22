import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/home';
import images from '@config/Images';
import {BottomTab} from '@components/index';
import Notifications from '@screens/notifications/Notifications';
import Profile from '@screens/profile/Profile';

const TabBarItems = [
  {
    label: 'Home',
    image: images.homeIcon,
  },
  {
    label: 'Notifications',
    icon: 'bell',
  },
  {
    label: 'Profile',
    image: images.userIcon,
  },
];

const TabStack = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        animation: 'fade',
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
        },
      }}
      tabBar={props => <BottomTab tabs={TabBarItems} {...props} />}>
      <TabStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <TabStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabNavigator;
