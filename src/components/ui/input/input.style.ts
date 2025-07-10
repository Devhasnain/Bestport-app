import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { isIOS } from '@rneui/base';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: isIOS ? 1: 1.5,
    borderRadius: 12,
    borderColor: colors.inputBorder,
    paddingHorizontal: 10,
    backgroundColor: colors.btnSecondary,
    borderBottomWidth:isIOS ? 1.2: 1.5,
    minHeight:50
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
