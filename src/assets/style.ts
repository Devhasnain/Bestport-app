import { colors, fonts } from '@/config/index';
import { isIOS } from '@rneui/base';


export default {
  screenOptions: {
    sceneStyle: {
      backgroundColor: 'transparent',
    },
    animation: 'fade',
    tabBarStyle:
    {
      height: isIOS ? 100 : 75,
      borderTopWidth: 0,
      elevation: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: isIOS ? 10 : 0,
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
