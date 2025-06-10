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

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const AuthLayoutContainer = ({children, title, description}: Props) => {
  return (
    <BackgroundImgContainer>
      <KeyboardAvoidingView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: ScreenHeight - 500,
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
                fontFamily={fonts.poppinsRegular}>
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
