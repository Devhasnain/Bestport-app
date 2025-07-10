import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, ActivityIndicator } from 'react-native';
import Typography from '@components/ui/Typography';
import Toast from 'react-native-simple-toast';
import { setToken } from '@store/authSlice';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import endpoints from '@api/endpoints';
import { usePost } from '@hooks/usePost';
import { Button } from '@rneui/themed';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { showToast } from '@utils/showToast';


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

const GoogleAuthBtn = ({title = 'Continue with Google'}: Props) => {
  const dispatch = useDispatch();
  const {request, loading} = usePost(endpoints.googleLogin);
  const handleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        const res = await request({
          payload: {
            name: userInfo?.data?.user?.name,
            email: userInfo?.data?.user?.email,
            profile_img: userInfo?.data?.user?.photo,
          },
        });
        dispatch(setToken(res?.data?.token));
        showToast('Login successfull');
      }
    } catch (error: any) {
      showToast('Google Sign-In error');
    }
  }, []);

  return (
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
      }}>
      <Image source={images.googleIcon} style={{height: 23, width: 23}} />
      <Typography
        fontFamily={fonts.poppinsMedium}
        fontSize={15}
        color={colors.primaryTextLight}>
        {title}
      </Typography>
      {loading && <ActivityIndicator color={colors.primary} size={18} />}
    </Button>
  );
};

export default GoogleAuthBtn;
