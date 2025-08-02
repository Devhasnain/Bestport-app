import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notifications from '@screens/notifications/Notifications';
import { Feather, Typography } from '@components/index';
import { TouchableOpacity } from 'react-native';
import Profile from '@screens/profile/Profile';
import EmployeeHome from '@screens/employee';
import CustomerHome from '@screens/customer';
import { getUser } from '@store/authSlice';
import { useSelector } from 'react-redux';
import React, { memo } from 'react';
import colors from '@config/Colors';
import { isIOS } from '@rneui/base';
import fonts from '@config/Fonts';


const TabStack = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const user = useSelector(getUser);

  return (
    <TabStack.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: 'transparent',
        },
        animation: "none",
        tabBarStyle: {
          height: isIOS ? 90 : 75,
          borderTopWidth: 0.3,
          elevation: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <TabStack.Screen
        name="Home"
        component={user?.role === 'customer' ? CustomerHome : EmployeeHome}
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
      color={focused ? colors?.activeTabIcon : colors.primaryTextLight}>
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
