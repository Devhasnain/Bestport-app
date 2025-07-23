import { Header, Input, KeyboardAvoidingView, Typography, } from '@components/index';
import { editPasswordSchema } from '@utils/schemas';
import React, { useCallback } from 'react';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import { Formik } from 'formik';


const EditPassword = () => {
  const handleOnSubmit = useCallback(async (values: any) => {}, []);
  return (
    <>
      <Header leftIcon title="Edit password" />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12}}>
        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          style={{paddingTop: 8}}
          fontSize={15}>
          Create a strong new password to secure your account. Make sure it
          meets the required criteria and is easy for you to remember.
        </Typography>

        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={editPasswordSchema}
          onSubmit={handleOnSubmit}>
          {({handleChange, handleSubmit, values, errors, touched, dirty}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                paddingTop: 30,
              }}>
              <Input
                placeholder="Current password"
                value={values.currentPassword}
                onChange={handleChange('currentPassword')}
                error={touched?.currentPassword && errors?.currentPassword}
                inputType="password"
              />
              <Input
                placeholder="Password"
                value={values.newPassword}
                onChange={handleChange('newPassword')}
                error={touched?.newPassword && errors?.newPassword}
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
                disabledTitleStyle={{color:colors.white}}
                disabled={!dirty}
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
    </>
  );
};

export default EditPassword;
