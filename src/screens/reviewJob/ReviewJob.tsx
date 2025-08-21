import { Header, Input, KeyboardAvoidingView, Typography, } from '@components/index';
import RatingStars from '@components/ratingStars/RatingStars';
import { useNavigation } from '@react-navigation/native';
import getErrorMessage from '@utils/getErrorMessage';
import { reviewSchema } from '@utils/schemas';
import { showToast } from '@utils/showToast';
import { usePost } from '@hooks/usePost';
import endpoints from '@api/endpoints';
import { Button } from '@rneui/themed';
import React, { memo } from 'react';
import colors from '@config/Colors';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import { Formik } from 'formik';


const ReviewJob = ({route}: any) => {
  const params = route?.params;
  // const dispatch = useDispatch();
  const createReviewApi = usePost();
  const navigation = useNavigation();

  const handleSubmit = async (values: {rating: number; comment: string},{resetForm}:any) => {
    try {
     await createReviewApi.request({
        payload: values,
        path: endpoints.createJobReview(params?.jobId, params?.employee?._id),
      });
      showToast('Job reviewed successfully');
      resetForm();
    } catch (err) {
      showToast(getErrorMessage(err));
    }
  };

  return (
    <>
      <Header leftIcon />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingHorizontal: 14, paddingTop: 5}}>
        <Typography
          fontSize={20}
          fontFamily={fonts.poppinsSemiBold}
          style={{marginBottom: 8}}>
          Rate Your Experience
        </Typography>

        <Typography fontSize={15} color={colors.primaryTextLight}>
          Tell us how your experience was with {params?.employee?.name}. Your
          feedback helps them grow and helps others make informed choices.
          Please rate their work and leave a short review.
        </Typography>

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
            <>
              <RatingStars
                onChange={(val: number) => setFieldValue('rating', val)}
              />

              <Input
                label="Write your review"
                placeholder="Review..."
                multiline
                numberOfLines={5}
                inputMode="text"
                value={values.comment}
                onChange={handleChange('comment')}
                error={
                  touched.comment && errors.comment ? errors.comment : undefined
                }
              />

              <View style={{paddingTop: 20}}>
                <Button
                  onPress={() => handleSubmit()}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  title={'Submit'}
                  buttonStyle={{
                    backgroundColor: colors.btnPrimary,
                    borderRadius: 12,
                    minHeight: 50,
                  }}
                  disabledStyle={{backgroundColor: colors.btnDisabled}}
                  disabledTitleStyle={{color: colors.white}}
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

export default memo(ReviewJob);
