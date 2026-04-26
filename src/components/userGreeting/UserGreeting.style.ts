import { StyleSheet } from 'react-native';
import { colors } from '@config/index';
import { isIOS } from '@rneui/base';


const styles = StyleSheet.create({
  container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: isIOS ? 70 : 55,
        paddingBottom: 25,
        gap: 5,
      },
  textContainer: {display: 'flex', flexDirection: 'column',width:"48%",gap:2},
  userNameTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    justifyContent: 'flex-start',
  },
  helloHand: {width: 30, aspectRatio: 1},
  btnsContainer:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: colors.primaryBtnText,
            padding:3,
            borderRadius: 8,
          },
  btn:{borderRadius: 8, padding: 10, display:"flex",flexDirection:"row", alignItems:"center", gap:8},
  btnActive: {backgroundColor: colors.primary },
});

export default styles;
