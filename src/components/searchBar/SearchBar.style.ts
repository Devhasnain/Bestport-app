import { StyleSheet } from 'react-native';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


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
    borderWidth:0.4,
    borderColor:colors.inputplaceholder,
    marginHorizontal:12
  },
  searchInput: {
    flex:1,
    paddingBottom:6,
    fontSize: 15,
    lineHeight:20,
    verticalAlign:"middle",
    color: colors.secondary,
    minHeight:47,
    fontFamily: fonts.poppinsRegular,
  },
});

export default styles;
