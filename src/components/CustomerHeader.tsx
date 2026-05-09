import { View, Image, StyleSheet, Platform } from 'react-native';
import { navigate } from '@/navigation/NavigationService';
import { Button } from '@rneui/themed';
import React from 'react';

import { colors, fonts, images } from '../config';
import { AntDesign } from '.';


export const CustomerHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.container}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image
            source={images.appLogoName}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Action Button */}
        <Button
          onPress={() => navigate('CreateJob')}
          title={'Create Job'}
          icon={<AntDesign name="plus" size={16} color={colors.white} />}
          buttonStyle={[styles.btnStyle, {backgroundColor: colors.btnPrimary}]}
          titleStyle={[styles.btnTitle, {fontFamily: fonts.poppinsSemiBold}]}
          containerStyle={styles.btnContainer}
          raised={false} // Clean look ke liye
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.white,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.035,
    shadowRadius: 10,
    elevation: 3.5,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 0.5,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal:12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 60 : 50, // Status bar handling
  },
  logoContainer: {
    height: 35,
    width: 105,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    borderRadius: 25, // Rounded corners zyada modern lagte hain
    overflow: 'hidden',
  },
  btnStyle: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 25,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:5
  },
  btnTitle: {
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 0.3,
    lineHeight:24
  },
});
