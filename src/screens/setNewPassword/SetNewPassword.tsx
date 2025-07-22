import { BackgroundImgContainer, Header, Input, KeyboardAvoidingView, Typography, } from '@components/index';
import { navigate } from '@navigation/NavigationService';
import { setNewPasswordSchema } from '@utils/schemas';
import getErrorMessage from '@utils/getErrorMessage';
import { showToast } from '@utils/showToast';
import React, { useCallback } from 'react';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import { Formik } from 'formik';


const SetNewPassword = ({route}: any) => {
  const setPasswordApi = usePost(endpoints.setNewPassword);

  const handleOnSubmit = useCallback(async (values: any) => {
    try {
      await setPasswordApi.request({
        payload: {token: route?.params?.token, password: values?.password},
      });
      navigate('Login');
      showToast("Password updated successfully")
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);

  return (
    <BackgroundImgContainer>
      <Header leftIcon />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12}}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
          Set New Password
        </Typography>
        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          style={{paddingTop: 8}}
          fontSize={15}>
          Create a strong new password to secure your account. Make sure it
          meets the required criteria and is easy for you to remember.
        </Typography>

        <Formik
          initialValues={{password: '', confirmPassword: ''}}
          validationSchema={setNewPasswordSchema}
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
                placeholder="Password"
                value={values.password}
                onChange={handleChange('password')}
                error={touched?.password && errors?.password}
                inputType="password"
              />

              <Input
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={touched?.confirmPassword && errors?.confirmPassword}
                inputType="password"
              />

              <Button
                disabledStyle={{backgroundColor: colors.messageBox}}
                disabled={setPasswordApi.loading}
                loading={setPasswordApi.loading}
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
    </BackgroundImgContainer>
  );
};

export default SetNewPassword;
