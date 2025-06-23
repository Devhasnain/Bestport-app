import React, {useCallback} from 'react';
import {
  BackgroundImgContainer,
  Header,
  Input,
  KeyboardAvoidingView,
  Typography,
} from '@components/index';
import {View} from 'react-native';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import {Formik} from 'formik';
import {Button} from '@rneui/themed';
import {navigate} from '@navigation/NavigationService';
import {setNewPasswordSchema} from '@utils/schemas';

const SetNewPassword = () => {
  const handleOnSubmit = useCallback(async (values: any) => {
    navigate('Login');
  }, []);

  return (
    <BackgroundImgContainer>
      <Header leftIcon />
      <KeyboardAvoidingView contentContainerStyle={{paddingTop: 5, paddingHorizontal:12}}>
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
                // disabled={loading}
                // loading={loading}
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
