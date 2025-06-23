import {View, Text} from 'react-native';
import React from 'react';
import fonts from '@config/Fonts';
import Typography from '@components/ui/Typography';
import colors from '@config/Colors';

type Props = {
  text?: string;
  linkTitle?: string;
  onPress: () => void;
};

const HaveAnAccount = ({text, linkTitle, onPress = () => {}}: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}>
      <Typography fontSize={15}>
        {text ?? "Don't have an account yet?"}
      </Typography>
      <Typography
        onPress={onPress}
        fontSize={15}
        fontFamily={fonts.poppinsMedium}
        color={colors.authLinkText}>
        {linkTitle ?? 'Sign up'}
      </Typography>
    </View>
  );
};

export default HaveAnAccount;
