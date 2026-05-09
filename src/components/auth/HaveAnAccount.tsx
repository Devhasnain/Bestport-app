import { Typography, View } from '@/components/index';
import { colors, fonts } from '@/config/index';
import React, { memo } from 'react';

import styles from './styles';


type Props = {
  text?: string;
  linkTitle?: string;
  onPress: () => void;
};

export const HaveAnAccount = memo(({text, linkTitle, onPress = () => {}}: Props) => {
  return (
    <View style={styles.haveAccountContainer}>
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
});