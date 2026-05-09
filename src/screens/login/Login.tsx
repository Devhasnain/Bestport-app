import { AuthLayoutContainer, Button, Input, HaveAnAccount, Typography, View, TouchableOpacity, } from '@/components/index';
import { getErrorMessage, showToast, loginSchema, showErrorAlert, } from '@/utils/index';
import { navigate } from '@/navigation/NavigationService';
import { colors, fonts } from '@/config/index';
import React, { useCallback } from 'react';
import { useLogin } from '@/hooks/index';
import { Formik } from 'formik';

import styles from './Login.style';


const Login = () => {
  const {mutate: login, isPending} = useLogin();
  const initialValues = {
    email: '',
    password: '',
  };

  const redirectToSignUp = useCallback(() => navigate('SignUp'), []);
  const handleSignIn = (values: any) => {
    login(values, {
      onSuccess: () => showToast('Login successfull.'),
      onError: (error: any) =>showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  const redirectToForget = useCallback(() => {
    navigate('ForgetPassword');
  }, []);

  return (
    <AuthLayoutContainer
      title="Login"
      description="Please enter your credentials to continue.">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSignIn}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.inputsContainer}>
            <Input
              placeholder="Email address"
              value={values.email}
              onChange={handleChange('email')}
              error={touched?.email && errors.email}
            />
            <View>
              <Input
                placeholder="Password"
                inputType="password"
                value={values.password}
                onChange={handleChange('password')}
                error={touched?.password && errors.password}
              />
            </View>

            <Button
              onPress={() => handleSubmit()}
              disabledStyle={{backgroundColor: colors.messageBox}}
              disabled={isPending}
              loading={isPending}
              title={'Submit'}
              buttonStyle={styles.submitBtnStyle}
              titleStyle={{fontFamily: fonts.poppinsMedium, lineHeight: 20}}
            />
          </View>
        )}
      </Formik>
      <View style={styles.footerContainer}>
        <HaveAnAccount onPress={redirectToSignUp} />
        <TouchableOpacity onPress={redirectToForget} activeOpacity={0.8}>
          <Typography
            color={colors.authLinkText}
            fontSize={15}
            lineHeight={20}
            style={{
              textDecorationLine: 'underline',
              marginTop: 8,
              textAlign: 'right',
            }}>
            Forget password?
          </Typography>
        </TouchableOpacity>
      </View>
    </AuthLayoutContainer>
  );
};

export default Login;
