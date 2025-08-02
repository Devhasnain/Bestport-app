import { StyleSheet } from "react-native";
import colors from "@config/Colors";
import fonts from "@config/Fonts";


const styles = StyleSheet.create({
  reviewText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 15,
    color: colors.primaryTextLight,
  },
  btnText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: 13,
    color: colors.btnPrimary,
  }
});

export default styles