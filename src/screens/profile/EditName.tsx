import { editNameSchema, getErrorMessage, showToast, showErrorAlert, } from '@/utils/index';
import { Header, Input, Typography, Button, View } from '@/components/index';
import { colors, fonts } from '@/config/index';
import { useUpdateName } from '@/hooks/index';
import { useAuthStore } from '@/store/index';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import React from 'react';


const EditName = () => {
  const {setUser, user} = useAuthStore();
  const {mutate: updateName, isPending} = useUpdateName();

  const handleOnSubmit = (values: any) => {
    if (!user) return;
    updateName(values, {
      onSuccess: () => {
        setUser({...user, name: values?.name});
        showToast('Name updated successfully');
      },
      onError: (error) => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  return (
    <>
      <Header leftIcon title="Edit name" />
      <Typography
        fontFamily={fonts.poppinsRegular}
        color={colors.primaryTextLight}
        style={styles.description}
        fontSize={15}>
        Update your display name. This will be shown on your profile and used
        across the app for job-related interactions.
      </Typography>

      <Formik
        initialValues={{name: user?.name || ''}}
        enableReinitialize={true}
        validationSchema={editNameSchema}
        onSubmit={handleOnSubmit}>
        {({handleChange, handleSubmit, values, errors, touched, dirty}) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Name"
              value={values.name}
              onChange={handleChange('name')}
              error={touched?.name && errors?.name}
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
    paddingTop: 16,
    paddingHorizontal: 14,
  },
  button: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: colors.btnPrimary,
  },
  buttonTitle: {
    color: colors.white,
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

export default EditName;
