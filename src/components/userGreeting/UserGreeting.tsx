import {View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';

import styles from './UserGreeting.style';
import Typography from '@components/ui/Typography';
import {useSelector} from 'react-redux';
import {getUser} from '@store/authSlice';
import fonts from '@config/Fonts';
import {Switch} from '@rneui/themed';
import colors from '@config/Colors';
import {connectSocket, getSocket} from '@services/socket';
import Toast from 'react-native-simple-toast';

const UserGreeting = () => {
  const user = useSelector(getUser);
  const [isEnabled, setIsEnabled] = useState(false);
  const socket = getSocket();
  const toggleSwitch = useCallback(() => {
    if (isEnabled) {
      socket?.disconnect();
      Toast.show('Your are offline now', 1000);
    } else {
      if (socket?.connected) connectSocket();
      socket?.connect();
      socket?.emit('online');
      Toast.show('Back online', 1000);
    }
    setIsEnabled(previousState => !previousState);
  }, [isEnabled]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 55,
        paddingBottom: 25,
        gap: 5,
      }}>
      <View style={[styles.textContainer]}>
        <Typography fontSize={14}>Welcome back!</Typography>
        <Typography
          numberOfLines={1}
          fontSize={20}
          fontFamily={fonts.poppinsBold}>
          {user?.name}
        </Typography>
      </View>
      <View
        style={{
          width: '48%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 2,
        }}>
        <Typography fontSize={12} fontFamily={fonts.poppinsMedium}>
          Avaliable for tasks?
        </Typography>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
          trackColor={{false: colors.gray, true: colors.primary}}
          thumbColor={colors.primary}
        />
      </View>
    </View>
  );
};

export default memo(UserGreeting);
