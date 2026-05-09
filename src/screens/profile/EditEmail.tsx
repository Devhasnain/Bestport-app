import { editEmailSchema, getErrorMessage, showErrorAlert, showToast } from '@/utils/index';
import { Header, Input, Typography, View, Button } from '@/components/index';
import { useUpdateEmail } from '@/hooks/index';
import { colors, fonts } from '@/config/index';
import { useAuthStore } from '@/store/index';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import React from 'react';


const EditEmail = () => {
  const {setUser, user} = useAuthStore();
  const {mutate: updateEmail, isPending} = useUpdateEmail();

  const handleOnSubmit = (values: any) => {
    if (!user) return;
    updateEmail(values, {
      onSuccess: () => {
        setUser({...user, email: values?.email});
        showToast('Email updated successfully');
      },
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  return (
    <>
      <Header leftIcon title="Edit email" />
      <Typography
        fontFamily={fonts.poppinsRegular}
        color={colors.primaryTextLight}
        style={styles.description}
        fontSize={15}>
        Please enter a valid and verified email address. This will be used for
        account-related notifications and password recovery. Make sure you have
        access to this email.
      </Typography>

      <Formik
        initialValues={{email: user?.email || ''}}
        validationSchema={editEmailSchema}
        onSubmit={handleOnSubmit}>
        {({handleChange, handleSubmit, values, errors, touched, dirty}) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Email address"
              value={values.email}
              onChange={handleChange('email')}
              error={touched?.email && errors?.email}
            />

            <Button
              disabledStyle={styles.buttonDisabled}
              disabledTitleStyle={styles.buttonDisabledTitle}
              disabled={isPending}
              loading={isPending}
              onPress={() => handleSubmit()}
              title={'Submit'}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    paddingTop: 8,
    paddingHorizontal: 14,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingTop: 30,
    paddingHorizontal: 14,
  },
  button: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: colors.btnPrimary,
  },
  buttonTitle: {
    fontFamily: fonts.poppinsMedium,
    lineHeight: 20,
  },
  buttonDisabled: {
    backgroundColor: colors.messageBox,
  },
  buttonDisabledTitle: {
    color: colors.white,
  },
});

export default EditEmail;