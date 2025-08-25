import React, { memo, useCallback, useEffect, useState } from 'react';
import { connectSocket, getSocket } from '@services/socket';
import { getUser, setUser } from '@store/authSlice';
import Typography from '@components/ui/Typography';
import { showToast } from '@utils/showToast';
import { useSelector } from 'react-redux';
import { Switch } from '@rneui/themed';
import colors from '@config/Colors';
import { View } from 'react-native';
import { isIOS } from '@rneui/base';
import fonts from '@config/Fonts';

import { useOnlineUsersContext } from '../../context/OnlineUsersContext';
import styles from './UserGreeting.style';


const UserGreeting = () => {
  const {users} = useOnlineUsersContext();
  const user = useSelector(getUser);
  const [isEnabled, setIsEnabled] = useState(false);
  const socket = getSocket();
  const toggleSwitch = useCallback(() => {
    if (isEnabled) {
      socket?.disconnect();
      setUser([]);
    } else {
      if (!socket?.connected) connectSocket();
      socket?.connect();
      socket?.emit('online');
      showToast('You are now available to receive tasks from the admin.');
    }
    setIsEnabled(previousState => !previousState);
  }, [isEnabled]);

  useEffect(() => {
    if (users?.length) {
      if (users?.includes(user?._id)) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    }else{
      setIsEnabled(false)
    }
  }, [users]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: isIOS ? 70 : 55,
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
