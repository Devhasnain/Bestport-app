import Feather from 'react-native-vector-icons/Feather';
import NetInfo from '@react-native-community/netinfo';
import React, {memo, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Dialog} from '@rneui/themed';

import styles from './NetworkAware.style';
import colors from '@config/Colors';

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
              size={40}
              color={colors.primaryTextLight}
              style={{marginBottom: 15}}
            />
            <Text style={styles.title}>You're offline</Text>
            <Text style={styles.text}>
              Please check your internet connection.
            </Text>
          </Dialog>
        </View>
      )}
    </>
  );
};

export default memo(NetworkAware);
