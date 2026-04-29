import { AuthLayoutContainer, Button, Input, HaveAnAccount, Typography, View, TouchableOpacity, } from '@components/index';
import { getErrorMessage, showToast, loginSchema } from '@utils/index';
import { navigate } from '@navigation/NavigationService';
import { colors, fonts } from '@config/index';
import { setToken } from '@store/authSlice';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import { Formik } from 'formik';

import styles from './Login.style';


const Login = () => {
  const dispatch = useDispatch();
  const {request, loading} = usePost(endpoints.login);
  const initialValues = {
    email: '',
    password: '',
  };

  const redirectToSignUp = useCallback(() => navigate('SignUp'), []);
  const handleSignIn = useCallback(async (values: any) => {
    try {
      const res = await request({payload: values});
      dispatch(setToken(res?.data?.token));
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);

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
              disabledStyle={{backgroundColor: colors.messageBox}}
              disabled={loading}
              loading={loading}
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
      <View
        style={styles.footerContainer}>
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
