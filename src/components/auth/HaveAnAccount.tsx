import Typography from '@components/ui/Typography';
import { View, Text } from 'react-native';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import React from 'react';


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
        justifyContent: 'center',
        gap: 5,
      }}>
      <Typography fontSize={15} style={{textAlign: 'center'}}>
        {text ?? "Don't have an account yet?"}
      </Typography>
      <Typography
        style={{textAlign: 'center'}}
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
