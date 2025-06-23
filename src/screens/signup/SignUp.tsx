import {View} from 'react-native';
import React, {useCallback} from 'react';
import styles from './SignUp.style';
import {navigate} from '@navigation/NavigationService';
import {Formik} from 'formik';
import {Input, AuthLayoutContainer, HaveAnAccount} from '@components/index';
import {Button} from '@rneui/themed';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import {registerSchema} from '@utils/schemas';
import {useDispatch} from 'react-redux';
import {usePost} from '@hooks/usePost';
import endpoints from '@api/endpoints';
import {setToken} from '@store/authSlice';
import Toast from 'react-native-simple-toast';
import getErrorMessage from '@utils/getErrorMessage';

const SignUp = () => {
  const dispatch = useDispatch();
  const {request, loading} = usePost(endpoints.register);
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const redirectToLogin = useCallback(() => navigate('Login'), []);
  const handleSignUp = useCallback(async (values: any) => {
    try {
      const res = await request({payload: values});
      dispatch(setToken(res?.data?.token));
    } catch (error) {
      Toast.show(getErrorMessage(error), 1000);
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingVertical: 20,
            }}>
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
            <Input
              placeholder="Confirm password"
              inputType="password"
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={touched?.confirmPassword && errors?.confirmPassword}
            />

            <Button
            disabledStyle={{backgroundColor:colors.messageBox}}
              disabled={loading}
              loading={loading}
              title={'Submit'}
              onPress={() => handleSubmit()}
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

      <HaveAnAccount
        text="Already have an account?"
        linkTitle="Login"
        onPress={redirectToLogin}
      />
    </AuthLayoutContainer>
  );
};

export default SignUp;
