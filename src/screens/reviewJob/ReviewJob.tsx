import { Header, Input, KeyboardAvoidingView, Typography, RatingStars, Button, View, UserAvatar, } from '@/components/index';
import { showErrorAlert, showToast, getErrorMessage, reviewSchema, } from '@/utils/index';
import { replace } from '@/navigation/NavigationService';
import { colors, fonts } from '@/config/index';
import { useReviewJob } from '@/hooks/index';
import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Formik } from 'formik';


const ReviewJob = ({route}: any) => {
  const params = route?.params;
  const {mutate: createReview, isPending} = useReviewJob(params?.jobId,params?.employeeId);
  const handleSubmit = async (
    values: {rating: number; comment: string},
    {resetForm}: any,
  ) => {
    createReview(
      {
        data: values,
        jobId: params?.jobId,
        employeeId: params?.employee?._id,
      },
      {
        onSuccess: () => {
          showToast('Job reviewed successfully');
          resetForm();
          replace('App');
        },
        onError: error => showErrorAlert('Error', getErrorMessage(error)),
      },
    );
  };

  return (
    <>
      <Header leftIcon title="Write a Review" />
      <KeyboardAvoidingView contentContainerStyle={styles.mainContainer}>
        {/* Employee Info Header */}
        <View style={styles.employeeHeader}>
          <UserAvatar
            image={params?.employee?.profile_img?.path}
            name={params?.employee?.name}
            size={70}
          />
          <Typography
            fontSize={20}
            fontFamily={fonts.poppinsSemiBold}
            style={{marginTop: 10}}>
            {params?.employee?.name}
          </Typography>
          <Typography
            fontSize={14}
            color={colors.primaryTextLight}
            style={{textAlign: 'center', marginTop: 5}}>
            How was your experience with our professional? Your feedback is
            valuable for the community.
          </Typography>
        </View>

        <Formik
          initialValues={{rating: 1, comment: ''}}
          validationSchema={reviewSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.ratingWrapper}>
                <Typography fontFamily={fonts.poppinsMedium}>
                  Tap to Rate
                </Typography>
                <RatingStars
                  size={35} // Thora bara taake asani se tap ho sake
                  onChange={(val: number) => setFieldValue('rating', val)}
                />
              </View>

              <Input
                label="Share more details"
                placeholder="Describe your experience (optional)..."
                multiline={true}
                numberOfLines={6}
                inputMode="text"
                containerStyle={styles.inputContainer}
                inputStyle={{
                  minHeight: 120,
                  paddingTop: 12,
                  textAlignVertical: 'top',
                  fontSize: 15,
                }}
                value={values.comment}
                onChange={handleChange('comment')}
                error={
                  touched.comment && errors.comment ? errors.comment : undefined
                }
              />

              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => handleSubmit()}
                  loading={isSubmitting || isPending}
                  disabled={isSubmitting || isPending}
                  title={'Submit Review'}
                  buttonStyle={styles.submitBtn}
                  disabledStyle={{backgroundColor: colors.btnDisabled}}
                  disabledTitleStyle={{color: colors.white}}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  employeeHeader: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
  },
  ratingWrapper: {
    alignItems: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 30,
  },
  submitBtn: {
    backgroundColor: colors.btnPrimary,
    borderRadius: 15,
    minHeight: 55,
    elevation: 2,
    shadowColor: colors.btnPrimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default memo(ReviewJob);
