import { appleAuth } from '@invertase/react-native-apple-authentication';
import { showErrorAlert, showToast } from '@/utils/showToast';
import { Typography, Button } from '@/components/index';
import { ActivityIndicator, Image } from 'react-native';
import { fonts, images, colors } from '@/config/index';
import getErrorMessage from '@/utils/getErrorMessage';
import { useAppleLogin } from '@/hooks/mutations';
import React, { memo } from 'react';

import styles from './styles';


export const AppleAuthBtn = memo(() => {
  const {mutate:appleLogin,isPending} = useAppleLogin()
  const handleSignIn = async () => {
    try {
      if (isPending) return;
      const appleRes = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (appleRes?.identityToken) {
        appleLogin({identityToken:appleRes?.identityToken},{
          onSuccess:()=>showToast('Login successfull'),
          onError:(error)=>showErrorAlert('Error',getErrorMessage(error))
        })
      }
    } catch (error: any) {
      showErrorAlert('Error',getErrorMessage(error));
    }
  };

  return (
    <Button
      onPress={handleSignIn}
      containerStyle={styles.authBtnContainerStyle}
      disabled={isPending}
      buttonStyle={styles.authButtonStyle}>
      <Image source={images.appleIcon} style={styles.btnImage} />
      <Typography
        fontFamily={fonts.poppinsMedium}
        fontSize={15}
        color={colors.primaryTextLight}>
        Continue with Apple
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
