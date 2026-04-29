import { StyleSheet } from "react-native";
import { ScreenWidth } from "@rneui/base";
import colors from "@config/Colors";


const employeProfileStyles  = StyleSheet.create({
    contentContainerStyle:{
        paddingTop: 30, gap: 25, paddingBottom:20
    },
    headerAvatarContainer:{
         display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
    },
    headerNameContainer:{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
    },
    ratingsContainer:{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
                ratingStarsWrapper:{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  },
                  reviewCardContainer:{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                  reviewCardAvatarContainer:{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 14,
                    },
                    reviewCardStarsContainer:{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  },
                  sectionContainer:{
                    padding: 14,
      backgroundColor: colors.white,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4.65,
      width: ScreenWidth - 28,
      marginHorizontal: 'auto',
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
                  }
})

export default employeProfileStyles