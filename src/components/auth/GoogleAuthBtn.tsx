import { Typography, Image, ActivityIndicator, Button } from '@/components/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { showErrorAlert, showToast } from '@/utils/showToast';
import { images, colors, fonts } from '@/config/index';
import { useGoogleLogin } from '@/hooks/mutations';
import React, { memo, useCallback } from 'react';
import { getErrorMessage } from '@/utils/index';

import styles from './styles';


GoogleSignin.configure({
  webClientId:
    '12305641445-es3hu77tlnbv879sv4gm66e4k3vl03o9.apps.googleusercontent.com',
  offlineAccess: true,
  iosClientId:
    '12305641445-k87od41po0fnif3mbnun9l2vsh22o6d4.apps.googleusercontent.com',
});

type Props = {
  title?: string;
};

export const GoogleAuthBtn = memo(({title = 'Continue with Google'}: Props) => {
  const {mutate: googleLogin, isPending} = useGoogleLogin();
  const handleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo?.data?.user?.email && userInfo?.data?.user?.name) {
        googleLogin(
          {
            name: userInfo?.data?.user?.name,
            email: userInfo?.data?.user?.email,
            profile_img: userInfo?.data?.user?.photo || '',
          },
          {
            onSuccess: () => showToast('Login successfull'),
            onError: error => showErrorAlert('Error', getErrorMessage(error)),
          },
        );
      }
    } catch (error: any) {
      showErrorAlert('Error', getErrorMessage(error));
    }
  }, []);

  return (
    <Button
      onPress={handleSignIn}
      containerStyle={styles.authBtnContainerStyle}
      disabled={isPending}
      buttonStyle={styles.authButtonStyle}>
      <Image source={images.googleIcon} style={styles.btnImage} />
      <Typography
        fontFamily={fonts.poppinsMedium}
        fontSize={15}
        color={colors.primaryTextLight}>
        {title}
      </Typography>
      {isPending && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color={colors.primary}
          size={18}
        />
      )}
    </Button>
  );
});
