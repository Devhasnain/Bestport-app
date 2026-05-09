import RNRestart from 'react-native-restart';
import React, { memo, useState } from 'react';
import fonts from '@/config/Fonts';

import { Button, Dialog, Typography, View } from '../index';
import styles from './ReportErrorModel.style';


export const ReportErrorModel = memo(() => {
  const [isVisible] = useState(true);
  const handleRestartApp = () => {
    RNRestart.Restart();
  };
  return (
    <>
      {isVisible && (
        <View style={styles.modelContainer}>
          <Dialog
            presentationStyle="overFullScreen"
            animationType="fade"
            isVisible={true}
            overlayStyle={styles.overlayStyle}
            statusBarTranslucent={true}>
            <Typography
              fontFamily={fonts.poppinsBold}
              fontSize={20}
              style={{textAlign: 'center', paddingBottom: 8}}>
              Something Went Wrong
            </Typography>
            <Typography
              fontFamily={fonts.poppinsRegular}
              fontSize={14}
              style={{textAlign: 'center'}}>
              We’re sorry, an unexpected error occurred. Please try reloading
              the app.
            </Typography>
            <Button
              containerStyle={{marginTop: 16}}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              title={'Restart app'}
              onPress={handleRestartApp}
            />
          </Dialog>
        </View>
      )}
    </>
  );
});
