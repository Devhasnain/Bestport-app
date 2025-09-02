import { Header, Input, KeyboardAvoidingView, Toast, Typography, } from '@components/index';
import { showAlert, showErrorAlert } from '@utils/showToast';
import { TouchableOpacity, View } from 'react-native';
import getErrorMessage from '@utils/getErrorMessage';
import { helpRequestSchema } from '@utils/schemas';
import React, { useCallback } from 'react';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { Formik } from 'formik';


const initialValues = Object.freeze({
  subject: '',
  message: '',
});
const CustomerSupport = () => {
  const sendRequestApi = usePost(endpoints.createHelpRequest);
  const redirectToApplications = useCallback(() => {}, []);
  const onSubmitRequest = useCallback(async (values: any, {resetForm}: any) => {
    try {
      await sendRequestApi.request({payload: values});
      showAlert('success', 'Application submitted');
      resetForm();
    } catch (error) {
      showErrorAlert('Error', getErrorMessage(error));
    }
  }, []);
  return (
    <>
      <Header leftIcon title="Customer support" />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12}}>
        <Typography fontFamily={fonts.poppinsSemiBold} fontSize={18}>
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
          initialValues={initialValues}
          validationSchema={helpRequestSchema}
          onSubmit={onSubmitRequest}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                paddingTop: 30,
              }}>
              <Input
                placeholder="Subject"
                value={values.subject}
                onChange={handleChange('subject')}
                error={touched?.subject && errors?.subject}
              />

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
                disabled={sendRequestApi.loading}
                loading={sendRequestApi.loading}
                onPress={() => handleSubmit()}
                title={'Submit'}
                buttonStyle={{
                  minHeight: 50,
                  borderRadius: 12,
                  backgroundColor: colors.btnPrimary,
                }}
                titleStyle={{fontFamily: fonts.poppinsMedium, lineHeight: 20}}
              />

              {/* <TouchableOpacity
                onPress={redirectToApplications}
                activeOpacity={0.8}>
                <Typography
                  color={colors.authLinkText}
                  fontSize={15}
                  lineHeight={20}
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                  }}>
                  My Applications
                </Typography>
              </TouchableOpacity> */}
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomerSupport;
