import { StyleSheet } from "react-native";
import colors from "@config/Colors";
import fonts from "@config/Fonts";


const styles = StyleSheet.create({
  reviewText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 15,
    color: colors.primaryTextLight,
    display:"flex",
    flexDirection:"column"
  },
  btnText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 12,
    color: colors.btnPrimary,
    lineHeight:14
  }
});

export default styles