import { Header, Input, KeyboardAvoidingView, Typography, Button, View, } from '@/components/index';
import { getErrorMessage, showToast, showErrorAlert } from '@/utils/index';
import { replace } from '@/navigation/NavigationService';
import { setNewPasswordSchema } from '@/utils/schemas';
import { useSetPassword } from '@/hooks/index';
import { colors, fonts } from '@/config/index';
import { useAuthStore } from '@/store/index';
import { Formik } from 'formik';
import React from 'react';


const SetNewPassword = () => {
  const {passwordResetToken, setPasswordResetToken} = useAuthStore();
  const {mutate: setNewPassword, isPending} = useSetPassword();

  const handleOnSubmit = (values: any) => {
    if (!passwordResetToken) return;
    setNewPassword(
      {
        token: passwordResetToken,
        password: values?.password,
      },
      {
        onSuccess: () => {
          setPasswordResetToken('');
          showToast('Password updated successfully.');
          replace('Login');
        },
        onError: error => showErrorAlert('Error', getErrorMessage(error)),
      },
    );
  };

  return (
    <>
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
                disabled={isPending}
                loading={isPending}
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

export default SetNewPassword;
