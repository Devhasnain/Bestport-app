import { colors, fonts } from "@/config/index";
import { StyleSheet } from "react-native";


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