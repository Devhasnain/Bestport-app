import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography, RNHeader } from '@/components/index';
import { useNavigation } from '@react-navigation/native';
import React, { memo, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, fonts } from '@/config/index';

import styles from './Header.style';


type Props = {
  leftIcon?: boolean;
  title?: string;
  style?: ViewStyle;
  children?: ReactNode;
  titleFontSize?: number;
  onBackPress?: () => void;
};

export const Header = memo(({
  style,
  title,
  leftIcon = false,
  children,
  titleFontSize = 18,
  onBackPress,
}: Props) => {
  const navigation = useNavigation();
  return (
    <RNHeader
      containerStyle={{
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        borderBottomWidth: 0,
      }}
      statusBarProps={{
        barStyle: 'dark-content',
        backgroundColor: 'transparent',
      }}
      leftComponent={
        <View style={[styles.container, {paddingHorizontal: 15}, style]}>
          {leftIcon && (
            <MaterialIcons
              size={20}
              onPress={onBackPress || (() => navigation.goBack())}
              name="arrow-back-ios"
              color={colors.btnPrimary}
            />
          )}
          {title && (
            <Typography
              style={{width: '90%'}}
              fontFamily={fonts.poppinsSemiBold}
              fontSize={titleFontSize}
              numberOfLines={1}>
              {title}
            </Typography>
          )}
          {children && children}
        </View>
      }
    />
  );
});
