import { Input, AuthLayoutContainer, HaveAnAccount, Button, View } from '@components/index';
import { getErrorMessage, registerSchema, showToast } from '@utils/index';
import { navigate } from '@navigation/NavigationService';
import { setToken } from '@store/authSlice';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import { colors } from '@config/index';
import { Formik } from 'formik';

import styles from './SignUp.style';


const SignUp = () => {
  const dispatch = useDispatch();
  const {request, loading} = usePost(endpoints.register);
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    // confirmPassword: '',
  };
  const redirectToLogin = useCallback(() => navigate('Login'), []);
  const handleSignUp = useCallback(async (values: any) => {
    try {
      const res = await request({payload: values});
      dispatch(setToken(res?.data?.token));
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);
  return (
    <AuthLayoutContainer
      title="Sign Up"
      description="Create your account to get started with us today.">
      <Formik
        initialValues={initialFormValues}
        validationSchema={registerSchema}
        onSubmit={handleSignUp}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View
            style={styles.inputsContainer}>
            <Input
              placeholder="Name"
              value={values.name}
              onChange={handleChange('name')}
              error={touched?.name && errors?.name}
            />
            <Input
              placeholder="Email address"
              value={values.email}
              onChange={handleChange('email')}
              error={touched?.email && errors?.email}
            />
            <Input
              placeholder="Password"
              inputType="password"
              value={values.password}
              onChange={handleChange('password')}
              error={touched?.password && errors?.password}
            />
            <Button
              disabledStyle={{backgroundColor: colors.messageBox}}
              disabled={loading}
              loading={loading}
              title={'Submit'}
              onPress={() => handleSubmit()}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
            />
          </View>
        )}
      </Formik>
      <View
        style={styles.footerContainer}>
        <HaveAnAccount
          text="Already have an account?"
          linkTitle="Login"
          onPress={redirectToLogin}
        />
      </View>
    </AuthLayoutContainer>
  );
};

export default SignUp;
