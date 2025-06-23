import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation:20
  },
  searchInput: {
    flex:1,
    paddingBottom:10,
    fontSize: 15,
    lineHeight:20,
    verticalAlign:"middle",
    color: colors.secondary,
    minHeight:50,
    fontFamily: fonts.poppinsRegular,
  },
});

export default styles;
