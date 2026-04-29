import { Typography, TouchableOpacity, View, ActivityIndicator } from '@components/index';
import { showAlert, getErrorMessage, } from '@utils/index';
import { useAvailability } from '@hooks/useAvailability';
import React, { memo, useState } from 'react';
import { colors, fonts } from '@config/index';
import { getUser } from '@store/authSlice';
import { useSelector } from 'react-redux';

import styles from './UserGreeting.style';


const UserGreeting = () => {
  const user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const {setAvailable} = useAvailability(serverStatus => {
    setIsOnline(serverStatus);
  });

  const handleToggle = async (value: boolean) => {
    try {
      setIsLoading(true);
      await setAvailable(value ? 'online' : 'offline');
      setIsOnline(value);
    } catch (error) {
      showAlert(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.textContainer]}>
        <Typography fontSize={14}>Welcome back!</Typography>
        <Typography
          numberOfLines={1}
          fontSize={20}
          fontFamily={fonts.poppinsBold}>
          {user?.name}
        </Typography>
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity
          disabled={isOnline || isLoading}
          activeOpacity={0.9}
          onPress={isOnline || isLoading ? () => {} : () => handleToggle(true)}
          style={[styles.btn, isOnline ? styles.btnActive : null]}>
            {!isOnline && isLoading && <ActivityIndicator size={12} color={colors.black50} />}
          <Typography
            fontSize={12}
            fontFamily={fonts.poppinsMedium}
            color={isOnline ? colors.white : colors.text}>
            Online
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isOnline || isLoading}
          activeOpacity={0.9}
          onPress={
            !isOnline || isLoading ? () => {} : () => handleToggle(false)
          }
          style={[styles.btn, !isOnline ? styles.btnActive : null]}>
            {isOnline && isLoading && <ActivityIndicator size={12} color={colors.black50} />}
          <Typography
            fontSize={12}
            fontFamily={fonts.poppinsMedium}
            color={!isOnline ? colors.white : colors.text}>
            Offline
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(UserGreeting);
