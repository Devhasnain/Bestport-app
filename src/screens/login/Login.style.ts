import { StyleSheet } from "react-native";
import colors from "@config/Colors";


const styles = StyleSheet.create({
  container: {},
  forgotPassword: {
    color: colors.authLinkText,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 20,
  },
  footerContainer:{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical:20
        }
});

export default styles