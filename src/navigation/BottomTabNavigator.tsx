import { Feather, Typography, TouchableOpacity, MaterialIcons } from '@/components/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Notifications, Profile, Home, Jobs } from '@/screens/index';
import styles from '@/assets/style';
import React, { memo } from 'react';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: styles.screenOptions.sceneStyle,
        animation: 'none',
        tabBarStyle: styles.screenOptions.tabBarStyle,
      }}>
      <Tab.Screen
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
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <MaterialIcons
          name='work-outline'
          color={focused ? styles.activeIconColor : styles.inactiveIconColor}
          size={25}
          />,
          tabBarLabel: ({focused}) => (
            <TabLabel focused={focused} label="Jobs" />
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
