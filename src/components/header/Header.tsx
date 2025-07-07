import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Typography from '@components/ui/Typography';
import { Header as RNHeader } from '@rneui/themed';
import React, { memo, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import styles from './Header.style';


type Props = {
  leftIcon?: boolean;
  title?: string;
  style?: ViewStyle;
  children?:ReactNode;
  titleFontSize?:number
};

const Header = ({style, title, leftIcon = false,children,titleFontSize=18}: Props) => {
  const navigation = useNavigation();
  return (
    <RNHeader
      containerStyle={{backgroundColor: 'transparent',paddingHorizontal:0, borderBottomWidth:0}}
      statusBarProps={{
        barStyle: 'dark-content',
        backgroundColor: 'transparent',
      }}
      leftComponent={
        <View style={[styles.container, {paddingHorizontal:15}, style]}>
          {leftIcon && (
            <MaterialIcons
              size={20}
              onPress={() => navigation.goBack()}
              name="arrow-back-ios"
              color={colors.btnPrimary}
            />
          )}
          {title && <Typography
            style={{width: '90%'}}
            fontFamily={fonts.poppinsSemiBold}
            fontSize={titleFontSize}
            numberOfLines={1}>
            {title}
          </Typography>}
          {
            children && children
          }
        </View>
      }
    />
  );
};

export default memo(Header);
