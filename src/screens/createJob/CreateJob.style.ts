import { StyleSheet } from "react-native";
import colors from "@/config/Colors";


const styles = StyleSheet.create({
    formContainer:{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                paddingTop: 12,
              },
              cityCodeInputContainer:{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
                submitBtnStyle:{
                  minHeight: 50,
                  borderRadius: 12,
                  backgroundColor: colors.btnPrimary,
                }
})

export default styles