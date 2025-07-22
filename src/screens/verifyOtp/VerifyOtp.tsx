import { Header, KeyboardAvoidingView, Typography } from '@components/index';
import React, { useCallback, useState, useEffect } from 'react';
import { navigate } from '@navigation/NavigationService';
import getErrorMessage from '@utils/getErrorMessage';
import { OtpInput } from 'react-native-otp-entry';
import { ActivityIndicator } from 'react-native';
import { showToast } from '@utils/showToast';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import styles from './VerifyOtp.style';


const VerifyOtp = ({ route }: any) => {
  const verifyOtpApi = usePost(endpoints.verifyMailOtp);
  const resendOtpApi = usePost(endpoints.sendMailOtp);

  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);

  const handleOnChange = useCallback((e: string) => setOtp(e), []);

  const handleSubmit = useCallback(async (e: string) => {
    try {
      const res = await verifyOtpApi.request({ payload: { otp: e, email: route?.params?.email } });
      navigate('SetNewPassword', { token: res?.data?.token });
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);

  const handleResend = useCallback(async () => {
    try {
      await resendOtpApi.request({ payload: { email: route?.params?.email } });
      setCounter(60);
      showToast('OTP resent successfully');
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);

  useEffect(() => {
    let interval: any;
    if (counter > 0) {
      interval = setInterval(() => setCounter(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <>
      <Header leftIcon />
      <KeyboardAvoidingView contentContainerStyle={{ paddingTop: 5, paddingHorizontal: 12 }}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
          Verify OTP
        </Typography>

        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          style={{ paddingTop: 8 }}
          fontSize={15}>
          Enter the One-Time Password (OTP) sent to your registered email address to verify your identity and proceed with resetting your password.
        </Typography>

        <OtpInput
          disabled={verifyOtpApi.loading}
          type="numeric"
          numberOfDigits={5}
          onTextChange={handleOnChange}
          onFilled={handleSubmit}
          theme={{
            containerStyle: styles.otpInputContainerStyle,
            pinCodeContainerStyle: styles.pinCodeContainerStyle,
            pinCodeTextStyle: styles.pinCodeTextStyle,
            focusStickStyle: styles.focusStickStyle,
            focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
            placeholderTextStyle: styles.placeholderTextStyle,
            filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle,
          }}
        />

        {verifyOtpApi.loading && <ActivityIndicator color={colors.primary} style={{ marginTop: 16 }} />}

          {counter > 0 ? (
            <Typography fontSize={15} color={colors.primaryTextLight}>
              Resend OTP in {counter} second{counter !== 1 ? 's' : ''}
            </Typography>
          ) : (
              <Typography onPress={handleResend} style={{textDecorationLine:"underline"}} fontSize={15} disabled={resendOtpApi.loading} color={colors.primary} fontFamily={fonts.poppinsMedium}>
                {resendOtpApi.loading ? 'Resending...' : 'Resend OTP'}
              </Typography>
          )}
      </KeyboardAvoidingView>
    </>
  );
};

export default VerifyOtp;
