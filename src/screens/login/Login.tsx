import {View, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {
  AuthLayoutContainer,
  Input,
  HaveAnAccount,
  Typography,
} from '@components/index';
import {navigate} from '@navigation/NavigationService';
import {Formik} from 'formik';
import {Button} from '@rneui/themed';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import {loginSchema} from '@utils/schemas';
import styles from './Login.style';
import {usePost} from '@hooks/usePost';
import endpoints from '@api/endpoints';
import Toast from 'react-native-simple-toast';
import getErrorMessage from '@utils/getErrorMessage';
import {useDispatch} from 'react-redux';
import {setToken} from '@store/authSlice';

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
      Toast.show(getErrorMessage(error), 1000);
    }
  }, []);

  return (
    <AuthLayoutContainer
      title="Login"
      description="Welcome back! Please enter your credentials to continue.">
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
              <TouchableOpacity activeOpacity={0.8}>
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

      <HaveAnAccount onPress={redirectToSignUp} />
    </AuthLayoutContainer>
  );
};

export default Login;
