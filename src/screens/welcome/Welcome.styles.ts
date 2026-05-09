import { ScreenHeight } from "@rneui/base";
import { StyleSheet } from "react-native";
import colors from "@/config/Colors";


const WelcomeStyle = StyleSheet.create({
    container: {
        height: ScreenHeight / 2,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 100,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg:{
        width: 200, height: 200
    },
    titleContainer:{display: 'flex', flexDirection: 'column', gap: 3},
    btnsContainer:{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 55,
          flex:1,
          paddingTop:20,
        },
        emailSignInBtn:{
            gap: 20,
            backgroundColor: colors.white,
            borderWidth: 1.5,
            borderColor: colors.gray,
            borderRadius: 12,
            paddingVertical: 12,
          }
});

export default WelcomeStyle