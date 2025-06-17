import {View, Image} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {
  BackgroundImgContainer,
  KeyboardAvoidingView,
  Typography,
} from '@components/index';
import images from '@config/Images';
import fonts from '@config/Fonts';
import {ScreenHeight} from '@rneui/base';
import colors from '@config/Colors';

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const AuthLayoutContainer = ({children, title, description}: Props) => {
  return (
    <BackgroundImgContainer>
      <KeyboardAvoidingView extraHeight={0} extraScrollHeight={0}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex:1,
            paddingBottom:16
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
    </BackgroundImgContainer>
  );
};

export default memo(AuthLayoutContainer);
