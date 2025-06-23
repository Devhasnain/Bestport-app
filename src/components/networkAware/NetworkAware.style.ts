import fonts from '@config/Fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modelContainer:{
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
  title: {
    fontFamily: fonts.poppinsBold,
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
