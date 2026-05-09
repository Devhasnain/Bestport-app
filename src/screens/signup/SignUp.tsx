import { Input, AuthLayoutContainer, HaveAnAccount, Button, View, } from '@/components/index';
import { getErrorMessage, registerSchema, showErrorAlert, showToast, } from '@/utils/index';
import { navigate } from '@/navigation/NavigationService';
import React, { useCallback } from 'react';
import { useSignUp } from '@/hooks/index';
import { colors } from '@/config/index';
import { Formik } from 'formik';

import styles from './SignUp.style';


const SignUp = () => {
  const {mutate: signUp, isPending} = useSignUp();
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
  };
  const redirectToLogin = useCallback(() => navigate('Login'), []);
  const handleSignUp = (values: any) => {
    signUp(values, {
      onSuccess: () => showToast('Sign up successfull'),
      onError: (error: any) => showErrorAlert('Error', getErrorMessage(error)),
    });
  };
  return (
    <AuthLayoutContainer
      title="Sign Up"
      description="Create your account to get started with us today.">
      <Formik
        initialValues={initialFormValues}
        validationSchema={registerSchema}
        onSubmit={handleSignUp}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.inputsContainer}>
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
              disabled={isPending}
              loading={isPending}
              title={'Submit'}
              onPress={() => handleSubmit()}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
            />
          </View>
        )}
      </Formik>
      <View style={styles.footerContainer}>
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
