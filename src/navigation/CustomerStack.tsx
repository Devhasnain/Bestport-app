import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyListings from '@screens/customer/myListings/MyListings';
import Account from '@screens/customer/account/Account';
import {Image, Text} from 'react-native';
import fonts from '@config/Fonts';
import images from '@config/Images';
import colors from '@config/Colors';
import {BottomTab} from '@components/index';

const TabBarItems = [
  {
    label: 'Home',
    icon: images.homeIcon,
  },
  {
    label: 'Account',
    icon: images.userIcon,
  },
];

const TabStack = createBottomTabNavigator();

const CustomerStack = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
        },
      }}
      tabBar={props => <BottomTab tabs={TabBarItems} {...props} />}>
      <TabStack.Screen
        name="Home"
        component={MyListings}
        options={{
          headerShown: false,
          tabBarIcon: props => <Image source={images.homeIcon} />,
          tabBarLabel: props => (
            <Text
              style={{
                fontFamily: fonts.poppinsMedium,
                fontSize: 13.5,
                color: colors.primaryTextLight,
              }}>
              {props.children}
            </Text>
          ),
        }}
      />
      <TabStack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: props => <Image source={images.userIcon} />,
          tabBarLabel: props => (
            <Text
              style={{
                fontFamily: fonts.poppinsMedium,
                fontSize: 13.5,
                color: colors.primaryTextLight,
              }}>
              {props.children}
            </Text>
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default CustomerStack;
