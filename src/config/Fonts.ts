import { Platform } from 'react-native';


const fonts = {
  poppinsBold: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins-Bold',
  poppinsMedium: Platform.OS === 'ios' ? 'Poppins-Medium' : 'Poppins-Medium',
  poppinsRegular: Platform.OS === 'ios' ? 'Poppins-Regular' : 'Poppins-Regular',
  poppinsSemiBold:
    Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
};

export default fonts;
