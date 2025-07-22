import { Header, Input, KeyboardAvoidingView, Typography, } from '@components/index';
import { navigate } from '@navigation/NavigationService';
import getErrorMessage from '@utils/getErrorMessage';
import { forgetPasswordSchema } from '@utils/schemas';
import { showToast } from '@utils/showToast';
import React, { useCallback } from 'react';
import endpoints from '@api/endpoints';
import { usePost } from '@hooks/usePost';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { View } from 'react-native';
import { Formik } from 'formik';


const ForgetPassword = () => {
  const sendOtpApi = usePost(endpoints.sendMailOtp);
  const handleOnSubmit = useCallback(async (values: any) => {
    try {
      await sendOtpApi.request({payload: values});
      navigate('VerifyOtp', {email: values?.email});
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);

  return (
    <>
      <Header leftIcon />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12}}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
          Forget password?
        </Typography>
        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          style={{paddingTop: 8}}
          fontSize={15}>
          Please enter your registered email address. An OTP will be sent to
          this address to initiate the password reset process.
        </Typography>

        <Formik
          initialValues={{email: ''}}
          validationSchema={forgetPasswordSchema}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                paddingTop: 30,
              }}>
              <Input
                placeholder="Email address"
                value={values.email}
                onChange={handleChange('email')}
                error={touched?.email && errors?.email}
              />

              <Button
                disabledStyle={{backgroundColor: colors.messageBox}}
                disabled={sendOtpApi.loading}
                loading={sendOtpApi.loading}
                onPress={() => handleSubmit()}
                title={'Submit'}
                buttonStyle={{
                  minHeight: 50,
                  borderRadius: 12,
                  backgroundColor: colors.btnPrimary,
                }}
                titleStyle={{fontFamily: fonts.poppinsMedium, lineHeight: 20}}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgetPassword;
