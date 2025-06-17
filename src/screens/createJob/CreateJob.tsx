import React, {useCallback} from 'react';
import {
  BackgroundImgContainer,
  Header,
  Input,
  KeyboardAvoidingView,
  Typography,
} from '@components/index';
import {View} from 'react-native';
import {Formik} from 'formik';
import SingleSelector from '@components/singleSelector/SingleSelector';
import {serviceTypes, urgencyLevel} from '@config/Constants';
import DateInput from '@components/dateInput/DateInput';
import {Button} from '@rneui/themed';
import colors from '@config/Colors';

const CreateJob = () => {
  const handleSubmit = useCallback(() => {}, []);
  return (
    <BackgroundImgContainer>
      <Header leftIcon title="Create job" />
      <KeyboardAvoidingView>
        <Formik
          initialValues={{}}
          // validationSchema={loginSchema}
          onSubmit={handleSubmit}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                paddingTop: 12,
              }}>
              <SingleSelector data={serviceTypes} />
              <Input placeholder="Title" />
              <Input
                placeholder="Description"
                multiline={true}
                numberOfLines={6}
              />
              <DateInput
                value=""
                mode="datetime"
                placeholder="Preferred Date and Time"
              />
              <SingleSelector
                data={urgencyLevel.map(item => {
                  return {name: item, value: item};
                })}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Input placeholder="City" additionalStyle={{width: '48%'}} />
                <Input
                  placeholder="Postcode"
                  additionalStyle={{width: '48%'}}
                />
              </View>
              <Input placeholder="Address" multiline={true} numberOfLines={3} />

              <Button
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
      </KeyboardAvoidingView>
    </BackgroundImgContainer>
  );
};

export default CreateJob;
