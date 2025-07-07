import { BackgroundImgContainer, Header, Input, KeyboardAvoidingView, Typography, } from '@components/index';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import { Formik } from 'formik';
import React from 'react';


const CustomerSupport = () => {
  return (
    <BackgroundImgContainer>
      <Header leftIcon title="Customer support" />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12}}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={21}>
          Need help or have a question?
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
          initialValues={{message: ''}}
          // validationSchema={setNewPasswordSchema}
          onSubmit={() => {}}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                paddingTop: 30,
              }}>
              <Input
                placeholder="Message"
                value={values.message}
                onChange={handleChange('message')}
                error={touched?.message && errors?.message}
                multiline
                numberOfLines={8}
              />

              <Button
                disabledStyle={{backgroundColor: colors.messageBox}}
                disabledTitleStyle={{color: colors.white}}
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

export default CustomerSupport;
