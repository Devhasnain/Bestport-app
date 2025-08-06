import { StyleSheet } from 'react-native';
import colors from '@config/Colors';


const styles = StyleSheet.create({
  profileImgLinearBg: {
    width: 70,
    height: 70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'relative',
    elevation: 35,
  },
  imgContainer: {
    height: '90%',
    width: '90%',
    borderRadius: 100,
    overflow: 'hidden',
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  cameraImg: {width: 20, height: 20, resizeMode: 'contain'},
  cameraBtn: {
    position: 'absolute',
    borderRadius: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 0.6,
    borderColor: colors.primaryTextLight,
    bottom: 5,
    right: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
export default styles;
