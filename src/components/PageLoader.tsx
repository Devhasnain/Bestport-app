import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

import { colors } from '../config';


export const PageLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={45} color={colors.primary} />
    </View>
  )
}