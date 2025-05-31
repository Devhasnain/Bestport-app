import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyListings from '@screens/customer/myListings/MyListings';
import Account from '@screens/customer/account/Account';
import { BottomTab } from '@components/index';

const TabStack = createBottomTabNavigator();

const CustomerStack = () => {
  return (
    <TabStack.Navigator tabBar={(props)=><BottomTab {...props} />}>
      <TabStack.Screen name="Home" component={MyListings} />
      <TabStack.Screen name="Account" component={Account} />
    </TabStack.Navigator>
  );
};

export default CustomerStack;
