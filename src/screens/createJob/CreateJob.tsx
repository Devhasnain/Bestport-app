import { SingleSelector, PhoneNumInput, Button, ScrollView, View, DateInput, Header, Input, Typography, } from '@/components/index';
import { showToast, getErrorMessage, createJobSchema, showErrorAlert, } from '@/utils/index';
import { serviceTypes, urgencyLevel, colors } from '@/config/index';
import { useKeyboard, useCreateJob } from '@/hooks/index';
import { useAuthStore } from '@/store/index';
import { Formik } from 'formik';
import React from 'react';

import styles from './CreateJob.style';


const CreateJob = () => {
  const keyboard = useKeyboard();
  const user = useAuthStore(state => state.user);
  const {mutate: createJob, isPending: loading} = useCreateJob();
  const initialValues = {
    service_type: '',
    title: '',
    description: '',
    preferred_date: '',
    urgency: '',
    city: '',
    post_code: '',
    address: '',
    instructions: '',
    contact_no: user?.phone ?? '',
  };
  const handleSubmit = (values: any, {resetForm}: any) => {
    createJob(values, {
      onSuccess: () => {
        showToast('Job has been submitted successfully.');
        resetForm();
      },
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };
  return (
    <>
      <Header leftIcon title="Create job" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 14}}>
        <Formik
          initialValues={initialValues}
          validationSchema={createJobSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <SingleSelector
                placeholder="Service type"
                value={values.service_type}
                onChange={handleChange('service_type')}
                data={serviceTypes?.map(item => {
                  return {label: item, value: item};
                })}
                error={touched.service_type && errors.service_type}
              />
              <Input
                label="Title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange('title')}
                error={touched.title && errors.title}
              />
              <Input
                value={values.description}
                onChange={handleChange('description')}
                error={touched.description && errors.description}
                placeholder="Description"
                multiline={true}
                numberOfLines={6}
              />
              <Input
                value={values.instructions}
                onChange={handleChange('instructions')}
                error={touched.instructions && errors.instructions}
                placeholder="Special instructions"
                multiline={true}
                numberOfLines={6}
              />
              <DateInput
                mode="datetime"
                placeholder="Preferred Date and Time"
                value={values.preferred_date}
                handleChange={(e: any) =>
                  setFieldValue('preferred_date', e?.date)
                }
                error={touched.preferred_date && errors.preferred_date}
              />
              <SingleSelector
                snapPoints={[]}
                value={values.urgency}
                onChange={handleChange('urgency')}
                error={touched.urgency && errors.urgency}
                placeholder="Urgency level"
                data={urgencyLevel.map(item => {
                  return {label: item, value: item};
                })}
              />
              <PhoneNumInput
                value={values?.contact_no}
                onChange={handleChange('contact_no')}
                error={touched?.contact_no && errors?.contact_no}
              />
              <View style={styles.cityCodeInputContainer}>
                <Input
                  value={values.city}
                  onChange={handleChange('city')}
                  error={touched.city && errors.city}
                  placeholder="City"
                  additionalStyle={{width: '48%'}}
                />
                <Input
                  placeholder="Postcode"
                  additionalStyle={{width: '48%'}}
                  value={values.post_code}
                  onChange={handleChange('post_code')}
                  error={touched.post_code && errors.post_code}
                />
              </View>
              <Input
                placeholder="Address"
                value={values.address}
                onChange={handleChange('address')}
                error={touched.address && errors.address}
                multiline={true}
                numberOfLines={3}
              />

              <Button
                disabledStyle={{backgroundColor: colors.btnDisabled}}
                disabledTitleStyle={{backgroundColor: colors.btnDisabled}}
                loading={loading}
                disabled={loading}
                onPress={() => handleSubmit()}
                buttonStyle={styles.submitBtnStyle}>
                <Typography color={colors.white}>Submit</Typography>
              </Button>
            </View>
          )}
        </Formik>
        {keyboard.isKeyboardActive && <View style={{height: 240}} />}
      </ScrollView>
    </>
  );
};

export default CreateJob;
