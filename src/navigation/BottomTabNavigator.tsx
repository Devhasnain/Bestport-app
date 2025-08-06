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
import { isIOS } from '@rneui/base';
import styles from '@assets/style';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const user = useSelector(getUser);
  const isCustomer = user?.role === 'customer';

  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: 'transparent',
        },
        animation: 'none',
        tabBarStyle: {
          height: isIOS ? 90 : 75,
          borderTopWidth: 0,
          elevation: 15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={isCustomer ? CustomerHome : EmployeeHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} icon="home" />,
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Home" />
          ),
          tabBarButton: props => <TabItem {...props} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <TabIcon focused={focused} icon="bell" />,
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Notifications" />
          ),
          tabBarButton: props => <TabItem {...props} />,
        }}
      />
      <Tab.Screen
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
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

type TabIconProps = {
  focused: boolean;
  icon: string;
};

const TabIcon = memo(({focused, icon}: TabIconProps) => (
  <Feather
    color={focused ? styles.activeIconColor : styles.inactiveIconColor}
    name={icon}
    size={24}
  />
));

type TabLabelProps = {
  focused: boolean;
  label: string;
};

const TabLabel = memo(({focused, label}: TabLabelProps) => (
  <Typography
    fontFamily={focused ? styles.activeFont : styles.inactiveFont}
    fontSize={13}
    color={focused ? styles.activeIconColor : styles.inactiveTextColor}>
    {label}
  </Typography>
));

const TabItem = memo((props: any) => (
  <TouchableOpacity {...props} activeOpacity={0.8} style={styles.tabItem}>
    {props.children}
  </TouchableOpacity>
));
