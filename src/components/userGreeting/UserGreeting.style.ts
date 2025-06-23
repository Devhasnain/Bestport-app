import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textContainer: {display: 'flex', flexDirection: 'column',width:"48%",gap:2},
  userNameTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    justifyContent: 'flex-start',
  },
  helloHand: {width: 30, aspectRatio: 1},
});

export default styles;
