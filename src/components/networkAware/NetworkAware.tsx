import Feather from 'react-native-vector-icons/Feather';
import React, { memo, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Text, View } from 'react-native';
import { Dialog } from '@rneui/themed';
import colors from '@config/Colors';

import styles from './NetworkAware.style';


const NetworkAware = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!isConnected && (
        <View style={styles.modelContainer}>
          <Dialog
            presentationStyle="overFullScreen"
            animationType="fade"
            isVisible={!isConnected}
            overlayStyle={styles.overlayStyle}
            statusBarTranslucent={true}>
            <Feather
              name="wifi-off"
              size={30}
              color={colors.primaryTextLight}
              style={{marginBottom: 15}}
            />
            <Text style={styles.title}>No Internet Connection</Text>
            <Text style={styles.text}>
              Please check your connection and try again.
            </Text>
          </Dialog>
        </View>
      )}
    </>
  );
};

export default memo(NetworkAware);
