import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notifications from '@screens/notifications/Notifications';
import { Feather, Typography } from '@components/index';
import { TouchableOpacity } from 'react-native';
import Profile from '@screens/profile/Profile';
import React, { memo } from 'react';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import Home from '@screens/home';


const TabStack = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        animation: 'fade',
        tabBarStyle: {
          height: 75,
          borderTopWidth:0.3,
          elevation: 0,
        },
      }}
    >
      <TabStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} icon="home" />,
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Home" />
          ),
          tabBarButton: props => <TabItem {...props} />,
        }}
      />
      <TabStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon icon="bell" focused={focused} />,
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Notifications" />
          ),
          tabBarButton: props => <TabItem {...props} />,
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} icon="user" />,
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Profile" />
          ),
          tabBarButton: props => <TabItem {...props} />,
        }}
      />
    </TabStack.Navigator>
  );
};

type TabIconProps = {
  focused: boolean;
  icon: string;
};
const TabIcon = memo(({focused, icon}: TabIconProps) => {
  return (
    <Feather
      color={focused ? colors?.activeTabIcon : colors.tabBarItem}
      name={icon}
      size={24}
    />
  );
});

type TabLabelProps = {
  focused: boolean;
  label: string;
};
const TabLabel = memo(({focused, label}: TabLabelProps) => {
  return (
    <Typography
      fontFamily={focused ? fonts.poppinsMedium : fonts.poppinsRegular}
      fontSize={13}
      color={focused ? colors?.activeTabText : colors.primaryTextLight}>
      {label}
    </Typography>
  );
});

const TabItem = memo((props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.8}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 3,
      }}>
      {props.children}
    </TouchableOpacity>
  );
});

export default BottomTabNavigator;
