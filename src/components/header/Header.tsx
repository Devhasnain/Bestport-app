import {View, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import styles from './Header.style';
import Typography from '@components/ui/Typography';
import fonts from '@config/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import colors from '@config/Colors';

type Props = {
  leftIcon?: boolean;
  title?: string;
  style?:ViewStyle
};

const Header = ({style,title, leftIcon = false}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container,style]}>
      {leftIcon && (
        <MaterialIcons
          size={20}
          onPress={() => navigation.goBack()}
          name="arrow-back-ios"
          color={colors.btnPrimary}
        />
      )}
      <Typography style={{width:"90%"}} fontFamily={fonts.poppinsSemiBold} fontSize={21} numberOfLines={1}>
        {title}
      </Typography>
    </View>
  );
};

export default memo(Header);
