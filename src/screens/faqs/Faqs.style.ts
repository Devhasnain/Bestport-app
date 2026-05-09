import { colors, fonts } from '@/config/index';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 14,
    gap: 20,
    paddingTop: 16,
  },
  cardContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth:0.3,
    borderColor:colors.inputplaceholder,
    display:"flex",flexDirection:"column",
    gap:10
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
