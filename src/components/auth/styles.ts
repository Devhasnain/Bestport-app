import { StyleSheet } from "react-native";
import colors from "@/config/Colors";
import { isIOS } from "@rneui/base";


const authComponentStyles = StyleSheet.create({
    authButtonStyle: {
        gap: 20,
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.gray,
        borderRadius: 12,
        paddingVertical: 12,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    authBtnContainerStyle: { width: '100%' },
    btnImage: { height: 23, width: 23 },
    haveAccountContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    authLayoutLogoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: isIOS ? 5 : 30,
    },
    authLayoutTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        paddingTop: 5,
    }
});

export default authComponentStyles