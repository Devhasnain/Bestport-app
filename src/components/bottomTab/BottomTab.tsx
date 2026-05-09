import { Typography, FontAwesome, ScreenWidth } from '@/components/index';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts } from '@/config/index';
import React, { memo } from 'react';

import styles from './BottomTab.style';


export const BottomTab = memo(
  ({
    tabs,
    state,
    navigation,
  }: BottomTabBarProps & {
    tabs: {label: string; icon?: any; image?: any}[];
  }) => {
    return (
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.6)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={[
          {
            minHeight: 90,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: ScreenWidth,
            paddingTop: 12,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        ]}>
        <View style={styles.container}>
          {tabs.map((item, index) => {
            const isActive = state.index === index;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.label)}
                key={index}
                style={styles.tabItem}>
                {item?.image && (
                  <Image
                    source={item.image}
                    style={styles.tabImage}
                    resizeMode="contain"
                    tintColor={isActive ? colors.primary : colors.tabBarItem}
                  />
                )}
                {item?.icon && (
                  <FontAwesome
                    name={item?.icon}
                    size={23.5}
                    color={isActive ? colors.primary : colors.tabBarItem}
                  />
                )}
                <Typography
                  fontSize={13}
                  fontFamily={
                    isActive ? fonts.poppinsMedium : fonts.poppinsRegular
                  }>
                  {item.label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    );
  },
);
