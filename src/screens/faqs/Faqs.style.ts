import { StyleSheet } from 'react-native';
import fonts from '@config/Fonts';
import colors from '@config/Colors';


const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    gap: 20,
    paddingTop: 16,
    paddingBottom:20
  },
  cardContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 10,
  },
  cardTitle: {
    fontFamily: fonts.poppinsSemiBold,
    fontSize: 16,
    fontWeight: '700',
    width: '90%',
    color:colors.primaryText
  },
  cardText: {
    paddingTop: 5,
    fontFamily: fonts.poppinsRegular,
    fontSize: 14,
    color: colors.primaryText,
  },
});

export default styles;
