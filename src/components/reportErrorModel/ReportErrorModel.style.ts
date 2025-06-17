import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  overlayStyle: {
    width: '90%',
    borderRadius: 20,
    elevation: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  buttonStyle: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.btnPrimary,
  },
  titleStyle: {
    fontFamily: fonts.poppinsRegular,
    lineHeight: 20,
    fontSize: 15,
  }
});

export default styles;
