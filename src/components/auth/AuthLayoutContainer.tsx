import { Header, KeyboardAvoidingView, Typography, View, Image, } from '@/components/index';
import { images, colors, fonts } from '@/config/index';
import React, { memo, ReactNode } from 'react';
import { isIOS } from '@rneui/base';

import styles from './styles';


type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export const AuthLayoutContainer = memo(
  ({children, title, description}: Props) => {
    return (
      <>
        {isIOS && <Header leftIcon />}

        <KeyboardAvoidingView
          extraHeight={0}
          extraScrollHeight={0}
          contentContainerStyle={{paddingHorizontal: 16}}>
          <View style={styles.authLayoutLogoContainer}>
            <Image source={images.appLogo} style={{width: 200, height: 200}} />
          </View>
          {title && (
            <View style={styles.authLayoutTitleContainer}>
              <Typography fontSize={20} fontFamily={fonts.poppinsSemiBold}>
                {title}
              </Typography>
              {description && (
                <Typography
                  lineHeight={18}
                  fontSize={15}
                  fontFamily={fonts.poppinsRegular}
                  color={colors.primaryTextLight}>
                  {description}
                </Typography>
              )}
            </View>
          )}

          {children}
        </KeyboardAvoidingView>
      </>
    );
  },
);
