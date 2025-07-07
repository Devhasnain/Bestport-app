import { BackgroundImgContainer, Header, Input, Toast, Typography, } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from '@utils/getErrorMessage';
import { getUser, setUser } from '@store/authSlice';
import { editEmailSchema } from '@utils/schemas';
import React, { useCallback } from 'react';
import endpoints from '@api/endpoints';
import { usePut } from '@hooks/usePut';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import { Formik } from 'formik';


const EditEmail = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const {request, loading} = usePut(endpoints.editEmail);
  const handleOnSubmit = useCallback(async (values: any) => {
    try {
      await request({payload: values});
      dispatch(setUser({...user, email: values?.email}));
      Toast.show('Email updated successfully', 1000);
    } catch (error) {
      Toast.show(getErrorMessage(error), 1000);
    }
  }, []);
  return (
    <BackgroundImgContainer>
      <Header leftIcon title="Edit email" />
      <Typography
        fontFamily={fonts.poppinsRegular}
        color={colors.primaryTextLight}
        style={{paddingTop: 8, paddingHorizontal: 14}}
        fontSize={15}>
        Please enter a valid and verified email address. This will be used for
        account-related notifications and password recovery. Make sure you have
        access to this email.
      </Typography>

      <Formik
        initialValues={{email: user?.email}}
        validationSchema={editEmailSchema}
        onSubmit={handleOnSubmit}>
        {({handleChange, handleSubmit, values, errors, touched, dirty}) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              paddingTop: 30,
              paddingHorizontal: 14,
            }}>
            <Input
              placeholder="Email address"
              value={values.email}
              onChange={handleChange('email')}
              error={touched?.email && errors?.email}
            />

            <Button
              disabledStyle={{backgroundColor: colors.messageBox}}
              disabledTitleStyle={{color: colors.white}}
              disabled={!dirty}
              loading={loading}
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
    </BackgroundImgContainer>
  );
};

export default EditEmail;
