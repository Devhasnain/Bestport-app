import { useAvailability } from '@/hooks/useAvailability';
import { colors, fonts } from '@/config/index';
import React, { memo, useState } from 'react';
import { useAuthStore } from '@/store/index';

import { Typography, TouchableOpacity, View, ActivityIndicator } from '../index';
import styles from './UserGreeting.style';


export const UserGreeting = memo(() => {
  const user = useAuthStore(state => state.user);
  const [isOnline, setIsOnline] = useState(user?.is_online);

  const {setAvailable, isToggling: isLoading} = useAvailability();

  const handleToggle = async (value: boolean) => {
    setIsOnline(value);
    setAvailable(value);
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
          {!isOnline && isLoading && (
            <ActivityIndicator size={12} color={colors.black50} />
          )}
          <Typography
            fontSize={12}
            fontFamily={fonts.poppinsMedium}
            color={isOnline ? colors.white : colors.primaryText}>
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
          {isOnline && isLoading && (
            <ActivityIndicator size={12} color={colors.black50} />
          )}
          <Typography
            fontSize={12}
            fontFamily={fonts.poppinsMedium}
            color={!isOnline ? colors.white : colors.primaryText}>
            Offline
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
});
