import {View, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import colors from '@config/Colors';
import Typography from '@components/ui/Typography';
import fonts from '@config/Fonts';
import { FontAwesome } from '@components/index';
import styles from './BottomTab.style';

const BottomTab = ({
  tabs,
  state,
  navigation,
}: BottomTabBarProps & {tabs: {label: string; icon?: any; image?: any}[]}) => {
  return (
    <View
      style={styles.container}>
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
            {item?.icon && <FontAwesome name={item?.icon} size={23.5} color={isActive ? colors.primary : colors.tabBarItem} />}
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
  );
};

export default memo(BottomTab);
