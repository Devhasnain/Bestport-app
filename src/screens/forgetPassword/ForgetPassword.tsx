import { Header, Input, KeyboardAvoidingView, Typography, View, Button, } from '@/components/index';
import { navigate } from '@/navigation/NavigationService';
import { forgetPasswordSchema } from '@/utils/schemas';
import { useForgotPassword } from '@/hooks/mutations';
import { showErrorAlert } from '@/utils/showToast';
import { getErrorMessage } from '@/utils/index';
import { colors, fonts } from '@/config/index';
import { useAuthStore } from '@/store/index';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import React from 'react';


const ForgetPassword = () => {
  const {mutate: forgotPassword, isPending} = useForgotPassword();
  const setEmail = useAuthStore(state => state.setEmail);

  const handleOnSubmit = (values: any) => {
    forgotPassword(values, {
      onSuccess: () => {
        setEmail(values?.email)
        navigate('VerifyOtp')
      },
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  return (
    <>
      <Header leftIcon />
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
          Forget password?
        </Typography>
        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          style={styles.subtitle}
          fontSize={15}>
          Please enter your registered email address. An OTP will be sent to
          this address to initiate the password reset process.
        </Typography>

        <Formik
          initialValues={{email: ''}}
          validationSchema={forgetPasswordSchema}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View style={styles.formWrapper}>
              <Input
                placeholder="Email address"
                value={values.email}
                onChange={handleChange('email')}
                error={touched?.email && errors?.email}
              />

              <Button
                disabledStyle={styles.buttonDisabled}
                disabled={isPending}
                loading={isPending}
                onPress={() => handleSubmit()}
                title={'Submit'}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 12,
  },
  subtitle: {
    paddingTop: 8,
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingTop: 30,
  },
  button: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: colors.btnPrimary,
  },
  buttonDisabled: {
    backgroundColor: colors.messageBox,
  },
  buttonTitle: {
    fontFamily: fonts.poppinsMedium,
    lineHeight: 20,
  },
});