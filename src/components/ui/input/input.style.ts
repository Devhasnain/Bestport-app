import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: colors.inputBorder,
    paddingHorizontal: 10,
    backgroundColor: colors.btnSecondary,
    borderBottomWidth:1.5
  },
  containerStyle: {
    paddingHorizontal: 0,
    minHeight: 50,
  },
  inputStyle: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 14,
    color: colors.primaryText,
  },
  textAreaContainer: {
    minHeight: 150,
  },
  textAreaInput: {height: 150, verticalAlign: 'top'},
});

export default Styles;
