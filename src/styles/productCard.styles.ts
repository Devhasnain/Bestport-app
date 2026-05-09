import { StyleSheet } from "react-native";
import { ScreenWidth } from "@rneui/base";
import colors from "@/config/Colors";


const productCardStyle = StyleSheet.create({
     cardContainer: {
        width: ScreenWidth - 23,
        borderWidth: 0.3,
        borderColor: colors.inputplaceholder,
        borderRadius: 12,
        marginHorizontal: 'auto',
        padding: 12,
        backgroundColor: colors.white,
        position: 'relative',
    },

    cardHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 14,
    },
    cardImageContainer: {
        width: '20%',
        aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 0.4,
        borderColor: colors.inputplaceholder,
    },
    cardTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '70%',
    },
    cardPriceContainer: {
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'row',
    },
    priceJustifyBtw: {
        justifyContent: "space-between"
    },
    priceFlexEnd: {
        justifyContent: "flex-end"
    },
    cardQtyBtn: {
        height: 28,
        width: 28,
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: colors.inputplaceholder,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardQtyBtnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    cardCheckedIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
})

export default productCardStyle