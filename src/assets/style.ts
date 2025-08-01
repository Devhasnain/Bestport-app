import colors from '@config/Colors';
import { isIOS } from '@rneui/base';
import fonts from '@config/Fonts';


export default {
  screenOptions: {
    sceneStyle: {
      backgroundColor: 'transparent',
    },
    animation: 'fade',
    tabBarStyle: {
      height: isIOS ? 90 : 75,
      borderTopWidth: 0,
      elevation: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
  },
  activeIconColor: colors.activeTabIcon,
  inactiveIconColor: colors.tabBarItem,
  activeFont: fonts.poppinsMedium,
  inactiveFont: fonts.poppinsRegular,
  inactiveTextColor: colors.primaryTextLight,
};
