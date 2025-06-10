import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import styles from './Login.style';
import {AuthLayoutContainer, Input, HaveAnAccount} from '@components/index';
import {navigate} from '@navigation/NavigationService';
import {Formik} from 'formik';
import KeyboardAvoidingView from '@components/KeyboardAvoidingView';

const Login = () => {
  const redirectToSignUp = useCallback(() => navigate('SignUp'), []);
  const handleSignIn = useCallback(async () => {}, []);

  return (
    <AuthLayoutContainer
      title="Login"
      description="Welcome back! Please enter your credentials to continue.">

      <Formik
        initialValues={{email: '', password: ''}}
        // validationSchema={signInValidationSchema}
        onSubmit={handleSignIn}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingVertical: 20,
            }}>
            <Input placeholder="Email address" />
            <Input placeholder="Password" inputType="password" />
          </View>
        )}
      </Formik>


      <HaveAnAccount onPress={redirectToSignUp} />
    </AuthLayoutContainer>
  );
};

export default Login;
