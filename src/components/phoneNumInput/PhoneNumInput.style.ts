import { StyleSheet } from 'react-native';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


const styles = StyleSheet.create({
  containerStyle:{
    borderWidth: 1.5,
    width: '100%',
    minHeight: 50,
    paddingVertical: 0,
    marginVertical: 0,
    borderRadius: 15,
    // borderColor: error ? 'red' : colors.inputBorder,
    overflow: 'hidden',
    color:colors.inputplaceholder,
  },
  countryPickerButtonStyle: {
    backgroundColor: colors.stepperDefault,
    width: '15%',
  },
  textContainerStyle: {
    paddingVertical: 0,
    padding: 0,
    margin: 0,
    backgroundColor:colors.white
  },
  errorText: {
    color: colors.authLinkText,
    paddingTop: 3,
    fontSize: 12,
  },
  codeTextStyle: {
    color: colors.inputplaceholder,
    fontFamily: fonts.poppinsRegular,
    fontSize: 15,
    lineHeight: 18,
  },
});

export default styles;
