import { StyleSheet } from 'react-native';
import fonts from '@config/Fonts';


const styles = StyleSheet.create({
  modelContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  overlayStyle: {
    width: '80%',
    borderRadius: 20,
    elevation: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 30,
    // paddingHorizontal: 25,
  },
  title: {
    fontFamily: fonts.poppinsBold,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal:5
  },
});

export default styles;
