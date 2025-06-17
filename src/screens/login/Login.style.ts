import colors from "@config/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{},
    forgotPassword: {
    color: colors.authLinkText,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  inputsContainer:{
     display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  paddingVertical: 20,
  }
});

export default styles