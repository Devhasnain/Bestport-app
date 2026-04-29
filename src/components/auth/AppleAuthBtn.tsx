import { appleAuth, } from '@invertase/react-native-apple-authentication';
import { ActivityIndicator, Image } from 'react-native';
import { Typography } from '@components/index';
import { showToast } from '@utils/showToast';
import { setToken } from '@store/authSlice';
import { useDispatch } from 'react-redux';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import { Button } from '@rneui/themed';
import { fonts } from '@config/index';
import images from '@config/Images';
import colors from '@config/Colors';
import React from 'react';


const AppleAuthBtn = () => {
  const dispatch = useDispatch();
  const {request, loading} = usePost(endpoints.appleLogin);
  const handleSignIn = async () => {
    try {
        if(loading) return;
      const appleRes = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (appleRes) {
        const res = await request({
          payload: {
            identityToken: appleRes?.identityToken,
          },
        });
        dispatch(setToken(res?.data?.token));
        showToast('Login successfull');
      }
    } catch (error: any) {
      showToast('Apple Sign-In error');
    }
  };

  return (
    // <AppleButton
    //   buttonStyle={AppleButton.Style.WHITE}
    //   buttonType={AppleButton.Type.SIGN_IN}
    //   style={{
    //     width: '100%',
    //     height: 50,
    //     backgroundColor: colors.white,
    //     borderWidth: 0.9,
    //     borderColor: colors.gray,
    //     borderRadius: 12,
    //     overflow: 'hidden',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    //   onPress={handleSignIn}
      
    // >
    //     <Text>asdfsd</Text>
    // </AppleButton>

     <Button
      onPress={handleSignIn}
      containerStyle={{width: '100%'}}
      disabled={loading}
      buttonStyle={{
        gap: 20,
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.gray,
        borderRadius: 12,
        paddingVertical: 12,
        position:"relative",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
      }}>
      <Image source={images.appleIcon} style={{height: 23, width: 23}} />
      <Typography
        fontFamily={fonts.poppinsMedium}
        fontSize={15}
        color={colors.primaryTextLight}>
        Continue with Apple
      </Typography>
      {loading && <ActivityIndicator style={{position:"absolute"}}  color={colors.primary} size={18} />}
    </Button>
  );
};

export default AppleAuthBtn;
