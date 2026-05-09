import { Platform, StyleSheet } from 'react-native';
import { colors } from '@/config/index';
import { isIOS } from '@rneui/base';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: isIOS ? 55 : 40,
    paddingBottom: 10,
    gap: 5,
    backgroundColor: colors.white,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 10,
    elevation: 3.5,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 0.5,
    borderBottomColor: '#F0F0F0',
  },
  textContainer: { display: 'flex', flexDirection: 'column', width: "48%", gap: 2 },
  userNameTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    justifyContent: 'flex-start',
  },
  helloHand: { width: 30, aspectRatio: 1 },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.white50,
    padding: 3,
    borderRadius: 8,
  },
  btn: { borderRadius: 8, padding: 10, display: "flex", flexDirection: "row", alignItems: "center", gap: 8 },
  btnActive: { backgroundColor: colors.primary },
});

export default styles;
