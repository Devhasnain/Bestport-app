import { GoogleAuthBtn, AppleAuthBtn, View, Image, Ionicons, Typography, Button } from '@/components/index';
import { navigate } from '@/navigation/NavigationService';
import { images, fonts, colors } from '@/config/index';
import React, { useCallback } from 'react';

import styles from './Welcome.styles';


const Welcome = () => {
  const handleRedirect = useCallback(() => navigate('Login'), []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={images.appLogo} style={styles.logoImg} />
        </View>
        <View style={styles.titleContainer}>
          <Typography
            style={{textAlign: 'center'}}
            fontSize={20}
            fontFamily={fonts.poppinsMedium}>
            Welcome to Bestport
          </Typography>
        </View>
      </View>
      <View style={styles.btnsContainer}>
        <AppleAuthBtn />
        <GoogleAuthBtn />
        <Button
          onPress={handleRedirect}
          containerStyle={{width: '100%'}}
          buttonStyle={styles.emailSignInBtn}>
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
