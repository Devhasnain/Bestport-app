import React, { useCallback, useState } from 'react';
import {
  BackgroundImgContainer,
  Header,
  KeyboardAvoidingView,
  Typography,
} from '@components/index';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import { OtpInput } from 'react-native-otp-entry';
import styles from './VerifyOtp.style';
import { navigate } from '@navigation/NavigationService';

const VerifyOtp = () => {

    const [otp,setOtp] = useState("");

    const handleOnChange = useCallback((e:string)=>{setOtp(e)},[otp])

    const handleSubmit = useCallback((e:string)=>{
        console.log(e);
        navigate("SetNewPassword")
    },[]);

  return (
    <BackgroundImgContainer>
      <Header leftIcon />
      <KeyboardAvoidingView
      contentContainerStyle={{paddingTop: 5, paddingHorizontal:12}}
      >
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

      </KeyboardAvoidingView>
    </BackgroundImgContainer>
  );
};

export default VerifyOtp;
