import { StyleSheet } from "react-native";
import colors from "@config/Colors";
import fonts from "@config/Fonts";


const styles = StyleSheet.create({
    inputsContainer:{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              paddingVertical: 20,
            },
            buttonStyle:{
                minHeight: 50,
                borderRadius: 12,
                backgroundColor: colors.btnPrimary,
            },
            titleStyle:{fontFamily: fonts.poppinsMedium, lineHeight: 20},
            footerContainer:{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }
});

export default styles