import { StyleSheet } from 'react-native';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryTextLight,
  },
  otpInputContainerStyle: {
    paddingTop:25,
    paddingBottom:15,
  },
  pinCodeContainerStyle: {
    borderWidth: 2,
    width: '16%',
    aspectRatio: 2/2.2,
    borderColor: colors.primaryTextLight,
  },
  pinCodeTextStyle: {
    color: colors.white,
  },
  focusStickStyle: {
    // color: colors.primaryTextLight,
  },
  focusedPinCodeContainerStyle: {
    borderColor: colors.primaryTextLight,
  },
  placeholderTextStyle: {
    color: colors.primaryTextLight,
  },
  filledPinCodeContainerStyle: {
    backgroundColor: colors.btnPrimary,
    borderColor: colors.btnPrimary,
  },
});

export default styles;
