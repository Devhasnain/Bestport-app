import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useCallback} from 'react';
import {
  AuthLayoutContainer,
  BackgroundImgContainer,
  Ionicons,
  Typography,
} from '@components/index';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import {navigate} from '@navigation/NavigationService';

import {Button} from '@rneui/themed';
import images from '@config/Images';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {authorize} from 'react-native-app-auth';

const config = {
  issuer: 'https://login.microsoftonline.com/common/v2.0',
  clientId: 'dac1220d-a8cd-45fe-ba2a-63f495b91a9a',
  redirectUrl: 'https://best-port.firebaseapp.com/__/auth/handler',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  additionalParameters: {},
  serviceConfiguration: {
    authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  },
};

GoogleSignin.configure({
  webClientId:
    '12305641445-es3hu77tlnbv879sv4gm66e4k3vl03o9.apps.googleusercontent.com',
  offlineAccess: true,
});

const Welcome = () => {
  const signIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User info:', userInfo);
    } catch (error) {
      console.error('Google Sign-In error', error);
    }
  }, []);

  const loginWithMicrosoft = useCallback(async () => {
    try {
      const result = await authorize(config);
      console.log('Microsoft login success', result);

      // Optionally send result.idToken to Firebase or your backend
    } catch (err) {
      console.error('Microsoft login error', err);
    }
  }, []);

  const handleRedirect = useCallback(() => navigate('Login'), []);

  return (
    <BackgroundImgContainer>
      <View
        style={{
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 100,
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={images.appLogo} style={{width: 200, height: 200}} />
        </View>
        <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
          <Typography
            style={{textAlign: 'center'}}
            fontSize={20}
            fontFamily={fonts.poppinsMedium}>
            Welcome to Bestport
          </Typography>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingVertical: 50,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 45,
        }}>
        <Button
          onPress={signIn}
          containerStyle={{width: '100%'}}
          buttonStyle={{
            gap: 20,
            backgroundColor: colors.white,
            borderWidth: 1.5,
            borderColor: colors.gray,
            borderRadius: 12,
            paddingVertical: 12,
          }}>
          <Image source={images.googleIcon} style={{height: 23, width: 23}} />
          <Typography
            fontFamily={fonts.poppinsMedium}
            fontSize={15}
            color={colors.primaryTextLight}>
            Continue with Google
          </Typography>
        </Button>
        <Button
          onPress={loginWithMicrosoft}
          containerStyle={{width: '100%'}}
          buttonStyle={{
            gap: 20,
            backgroundColor: colors.white,
            borderWidth: 1.5,
            borderColor: colors.gray,
            borderRadius: 12,
            paddingVertical: 12,
          }}>
          <Image source={images.googleIcon} style={{height: 23, width: 23}} />
          <Typography
            fontFamily={fonts.poppinsMedium}
            fontSize={15}
            color={colors.primaryTextLight}>
            Continue with Google
          </Typography>
        </Button>
        <Button
          onPress={handleRedirect}
          containerStyle={{width: '100%'}}
          buttonStyle={{
            gap: 20,
            backgroundColor: colors.white,
            borderWidth: 1.5,
            borderColor: colors.gray,
            borderRadius: 12,
            paddingVertical: 12,
          }}>
          {/* <Image source={images.googleIcon} style={{height:25,wi3th:25}} 3/> */}
          <Ionicons
            name="mail-outline"
            size={23}
            color={colors.primaryTextLight}
          />
          <Typography
            fontFamily={fonts.poppinsMedium}
            fontSize={15}
            color={colors.primaryTextLight}>
            Continue with Email
          </Typography>
        </Button>
      </View>
    </BackgroundImgContainer>
  );
};

export default Welcome;
