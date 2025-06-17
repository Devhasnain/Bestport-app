import colors from "@config/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create<any>({
  tabBtn: (isActive: boolean) => ({
    backgroundColor: isActive ? colors.btnPrimary : colors.btnSecondary,
    borderWidth: 1.2,
    borderColor: isActive ? colors.btnPrimary : colors.gray,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
  })
});

export default styles