import { Header, KeyboardAvoidingView, Typography } from '@/components/index';
import { showErrorAlert, showToast, getErrorMessage } from '@/utils/index';
import React, { useCallback, useState, useEffect } from 'react';
import { useForgotPassword, useVerifyOtp } from '@/hooks/index';
import { replace } from '@/navigation/NavigationService';
import { OtpInput } from 'react-native-otp-entry';
import { ActivityIndicator } from 'react-native';
import { colors, fonts } from '@/config/index';
import { useAuthStore } from '@/store/index';

import styles from './VerifyOtp.style';


const VerifyOtp = () => {
  const {email,setPasswordResetToken} = useAuthStore();
  const {mutate: verifyOtp, isPending: isVerifing} = useVerifyOtp();
  const {mutate: sendOtp, isPending: isSendingOtp} = useForgotPassword();

  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);

  const handleOnChange = useCallback((e: string) => setOtp(e), []);

  const handleSubmit = (e: string) => {
    if (!email) return;
    verifyOtp(
      {
        email,
        otp: e,
      },
      {
        onSuccess: data => {
          setPasswordResetToken(data?.data?.token)
          replace('SetNewPassword');
        },
        onError: error => showErrorAlert('Error', getErrorMessage(error)),
      },
    );
  };

  const handleResend = () => {
    if (!email) return;
    sendOtp(
      {
        email,
      },
      {
        onSuccess: () => {
          setCounter(60);
          showToast('OTP resent successfully');
        },
        onError: error => showErrorAlert('Error', getErrorMessage(error)),
      },
    );
  };

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

      {email ? (
        <KeyboardAvoidingView
          contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12}}>
          <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
            Verify OTP
          </Typography>

          <Typography
            fontFamily={fonts.poppinsRegular}
            color={colors.primaryTextLight}
            style={{paddingTop: 8}}
            fontSize={15}>
            Enter the One-Time Password (OTP) sent to your registered email
            address to verify your identity and proceed with resetting your
            password.
          </Typography>

          <OtpInput
            disabled={isVerifing}
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

          {isVerifing && (
            <ActivityIndicator color={colors.primary} style={{marginTop: 16}} />
          )}

          {counter > 0 ? (
            <Typography fontSize={15} color={colors.primaryTextLight}>
              Resend OTP in {counter} second{counter !== 1 ? 's' : ''}
            </Typography>
          ) : (
            <Typography
              onPress={handleResend}
              style={{textDecorationLine: 'underline'}}
              fontSize={15}
              disabled={isSendingOtp}
              color={colors.primary}
              fontFamily={fonts.poppinsMedium}>
              {isSendingOtp ? 'Resending...' : 'Resend OTP'}
            </Typography>
          )}
        </KeyboardAvoidingView>
      ) : (
        <Typography>
          Something went wrong, go back and renter the email.
        </Typography>
      )}
    </>
  );
};

export default VerifyOtp;
