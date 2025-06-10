import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import colors from '@config/Colors';

const BottomTab = ({
  tabs,
  state,
  navigation
}: BottomTabBarProps & {tabs: {label: string; icon: any}[]}) => {
  return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 75,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
          elevation: 20,
          paddingHorizontal: 16,
          paddingTop:5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {tabs.map((item, index) => (
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>navigation.navigate(item.label)}
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: 4,
            }}>
            <Image source={item.icon} tintColor={state.index === index ? colors.primary : colors.tabBarItem} />
            <Text style={{color:state.index === index ? colors.primaryText : colors.tabBarItem, fontSize:13}}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
  );
};

export default memo(BottomTab);
