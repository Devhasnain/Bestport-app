import { Header, Input, KeyboardAvoidingView, Typography, } from '@components/index';
import RatingStars from '@components/ratingStars/RatingStars';
import React, { memo, useState } from 'react';
import { ScreenHeight } from '@rneui/base';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';


const ReviewJob = ({route}: any) => {
  const employee = route?.params?.employee;
  const [form, setForm] = useState({
    rating: 1,
    comment: '',
  });
  const handleReview = (e: Number) => {
    setForm((pre: any) => ({...pre, rating: e}));
  };
  return (
    <>
      <Header leftIcon title="Rate Your Experience" titleFontSize={21} />
      <KeyboardAvoidingView
        contentContainerStyle={{paddingHorizontal: 14, paddingTop: 10}}>
        
            <Typography fontSize={15} color={colors.primaryTextLight}>
              Tell us how your experience was with {employee?.name}. Your
              feedback helps them grow and helps others make informed choices.
              Please rate their work and leave a short review.
            </Typography>

            <RatingStars onChange={handleReview} />

            <Input
              placeholder="Review"
              multiline={true}
              numberOfLines={5}
              inputMode="text"
              value={form.comment}
              onChange={e => setForm(pre => ({...pre, comment: e}))}
            />

<View
style={{
    paddingTop:20
}}
>

          <Button
          disabled={!form.rating || !form.comment?.trim()?.length}
            // onPress={redirectToReview}
            disabledStyle={{backgroundColor: colors.btnDisabled}}
            disabledTitleStyle={{color: colors.white}}
            title={'Submit'}
            buttonStyle={{
              backgroundColor: colors.btnPrimary,
              borderRadius: 12,
              minHeight: 50,
            }}
          />
</View>

      </KeyboardAvoidingView>
    </>
  );
};

export default memo(ReviewJob);
