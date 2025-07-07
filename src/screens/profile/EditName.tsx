import { BackgroundImgContainer, Header, Input, Toast, Typography, } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from '@utils/getErrorMessage';
import { getUser, setUser } from '@store/authSlice';
import { editNameSchema } from '@utils/schemas';
import React, { useCallback } from 'react';
import endpoints from '@api/endpoints';
import { usePut } from '@hooks/usePut';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import { Formik } from 'formik';


const EditName = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const {request, loading} = usePut(endpoints.editName);
  const handleOnSubmit = useCallback(async (values: any) => {
    try {
      await request({payload: values});
      dispatch(setUser({...user, name: values?.name}));
      Toast.show("Name updated successfully", 1000);
    } catch (error) {
      Toast.show(getErrorMessage(error), 1000);
    }
  }, []);
  return (
    <BackgroundImgContainer>
      <Header leftIcon title="Edit name" />
      <Typography
        fontFamily={fonts.poppinsRegular}
        color={colors.primaryTextLight}
        style={{paddingTop: 8, paddingHorizontal: 14}}
        fontSize={15}>
        Update your display name. This will be shown on your profile and used
        across the app for job-related interactions.
      </Typography>

      <Formik
        initialValues={{name: user?.name}}
        enableReinitialize={true}
        validationSchema={editNameSchema}
        onSubmit={handleOnSubmit}>
        {({handleChange, handleSubmit, values, errors, touched, dirty}) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              paddingTop: 16,
              paddingHorizontal: 14,
            }}>
            <Input
              placeholder="Name"
              value={values.name}
              onChange={handleChange('name')}
              error={touched?.name && errors?.name}
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
              titleStyle={{
                color: colors.white,
                fontFamily: fonts.poppinsMedium,
                lineHeight: 20,
              }}
            />
          </View>
        )}
      </Formik>
    </BackgroundImgContainer>
  );
};

export default EditName;
