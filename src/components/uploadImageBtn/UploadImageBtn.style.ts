import colors from '@config/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    alignSelf: 'flex-end',
  },
  logoBox: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    position:"relative",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  img: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    top: 40,
    left: -18,
    padding: 5,
    borderRadius: 20,
    backgroundColor: colors.primaryBtnText,
    borderWidth: 1,
  },
  cameraIcon: {
    width: 25,
    height: 25,
  },
  option: {
    padding: 16,
    alignItems: 'center',
  },
});

export default styles;
