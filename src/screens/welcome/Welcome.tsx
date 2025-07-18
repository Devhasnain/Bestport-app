import GoogleAuthBtn from '@components/auth/GoogleAuthBtn';
import { navigate } from '@navigation/NavigationService';
import { Ionicons, Typography } from '@components/index';
import React, { useCallback } from 'react';
import { View, Image } from 'react-native';
import { ScreenHeight } from '@rneui/base';
import { Button } from '@rneui/themed';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


// const config = {

//   issuer: 'https://login.microsoftonline.com/common/v2.0',
//   clientId: 'dac1220d-a8cd-45fe-ba2a-63f495b91a9a',
//   redirectUrl: 'https://best-port.firebaseapp.com/__/auth/handler',
//   scopes: ['openid', 'profile', 'email', 'offline_access'],
//   additionalParameters: {},
//   serviceConfiguration: {
//     authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
//     tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
//   },
// };

const Welcome = () => {
  // const loginWithMicrosoft = useCallback(async () => {
  //   try {
  //     const result = await authorize(config);
  //     console.log('Microsoft login success', result);

  //     // Optionally send result.idToken to Firebase or your backend
  //   } catch (err) {
  //     console.error('Microsoft login error', err);
  //   }
  // }, []);

  const handleRedirect = useCallback(() => navigate('Login'), []);

  return (
    <>
      <View
        style={{
          height: ScreenHeight/2,
          // borderWidth:1,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 100,
          alignItems: 'center',
          justifyContent:"flex-end"
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
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 55,
          flex:1,
          paddingTop:20,
        }}>
        <GoogleAuthBtn />
        {/* <GoogleAuthBtn /> */}


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
    </>
  );
};

export default Welcome;
