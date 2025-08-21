import SingleSelector from '@components/singleSelector/SingleSelector';
import PhoneNumInput from '@components/phoneNumInput/PhoneNumInput';
import { serviceTypes, urgencyLevel } from '@config/Constants';
import { Header, Input, Typography, } from '@components/index';
import DateInput from '@components/dateInput/DateInput';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from '@utils/getErrorMessage';
import { useKeyboard } from '@hooks/useKeyboard';
import { createJobSchema } from '@utils/schemas';
import { ScrollView, View } from 'react-native';
import { showToast } from '@utils/showToast';
import React, { useCallback } from 'react';
import { getUser } from '@store/authSlice';
import { usePost } from '@hooks/usePost';
import { addJob } from '@store/jobSlice';
import endpoints from '@api/endpoints';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { Formik } from 'formik';


const CreateJob = ({navigation}: any) => {
  const keyboard = useKeyboard();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const {request, loading} = usePost(endpoints.createJob);
  const initialValues = {
    service_type: '',
    title: '',
    description:'',
    preferred_date: '',
    urgency: '',
    city: '',
    post_code: '',
    address: '',
    instructions: '',
    contact_no:user?.phone ??""
  };
  const handleSubmit = useCallback(async (values: any, {resetForm}: any) => {
    try {
      const res = await request({payload: values});
      dispatch(addJob(res.data));
      showToast('Job has been submitted successfully.');
      navigation?.goBack();
      resetForm();
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, []);
  return (
    <>
      <Header leftIcon title="Create job" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20,paddingHorizontal:14}}
          >
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  paddingTop: 12,
                }}>
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
                onChange={handleChange("contact_no")}
                error={touched?.contact_no && errors?.contact_no}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                disabledStyle={{backgroundColor:colors.btnDisabled}}
                  disabledTitleStyle={{backgroundColor: colors.btnDisabled}}
                  loading={loading}
                  disabled={loading}
                  onPress={() => handleSubmit()}
                  buttonStyle={{
                    minHeight: 50,
                    borderRadius: 12,
                    backgroundColor: colors.btnPrimary,
                  }}>
                  <Typography color={colors.white}>Submit</Typography>
                </Button>
              </View>
            )}
          </Formik>
          {
            keyboard.isKeyboardActive && <View style={{height:240}} />
          }
        </ScrollView>
    </>
  );
};

export default CreateJob;
