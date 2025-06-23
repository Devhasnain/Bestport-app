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
import {forgetPasswordSchema} from '@utils/schemas';
import { navigate } from '@navigation/NavigationService';

const ForgetPassword = () => {
  const handleOnSubmit = useCallback(async (values: any) => {
    navigate("VerifyOtp")
  }, []);

  return (
    <BackgroundImgContainer>
      <Header leftIcon />
      <KeyboardAvoidingView contentContainerStyle={{paddingTop: 5, paddingHorizontal:12}}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
          Forget password?
        </Typography>
        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          style={{paddingTop: 8}}
          fontSize={15}
          >
          Please enter your registered email address. An OTP will be sent to
          this address to initiate the password reset process.
        </Typography>

        <Formik
          initialValues={{email: ''}}
          validationSchema={forgetPasswordSchema}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View style={{display: 'flex', flexDirection: 'column', gap: 12,paddingTop:30}}>
              <Input
              placeholder='Email address'
                value={values.email}
                onChange={handleChange('email')}
                error={touched?.email && errors?.email}
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

export default ForgetPassword;
