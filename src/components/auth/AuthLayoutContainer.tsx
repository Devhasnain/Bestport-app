import { Header, KeyboardAvoidingView, Typography, } from '@components/index';
import React, { memo, ReactNode } from 'react';
import { View, Image } from 'react-native';
import images from '@config/Images';
import colors from '@config/Colors';
import { isIOS } from '@rneui/base';
import fonts from '@config/Fonts';


type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const AuthLayoutContainer = ({children, title, description}: Props) => {
  return (
    <>
      {isIOS && <Header leftIcon />}

      <KeyboardAvoidingView
        extraHeight={0}
        extraScrollHeight={0}
        contentContainerStyle={{paddingHorizontal: 16}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingVertical: isIOS ? 5 : 30,
          }}>
          <Image source={images.appLogo} style={{width: 200, height: 200}} />
        </View>
        {title && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              paddingTop: 5,
            }}>
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
};

export default memo(AuthLayoutContainer);
