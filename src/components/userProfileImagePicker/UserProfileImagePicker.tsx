import {ActivityIndicator, Image, View} from 'react-native';
import React from 'react';

import styles from './UserProfileImagePicker.style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@config/Colors';
import images from '@config/Images';

const UserProfileImagePicker = ({
  selectedImage,
  setSelectedImage,
  loading = false,
}: any) => {
  return (
    <LinearGradient
      colors={[colors.white, colors.white]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={styles.profileImgLinearBg}>
      <View style={styles.imgContainer}>
        {loading && (
          <ActivityIndicator
            size={20}
            color={colors.primary}
            style={{position: 'absolute', zIndex: 999}}
          />
        )}
        <Image
          source={
            selectedImage?.uri
              ? {uri: selectedImage?.uri}
              : images.imageNotFound
          }
          style={styles.img}
          resizeMode="cover"
        />
      </View>
      {/* <UploadImageBtn
        disabled={loading}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        trigger={
          <Image
            source={images.cameraIcon}
            resizeMode="contain"
            style={styles.cameraImg}
          />
        }
        triggerStyle={styles.cameraBtn}
      /> */}
    </LinearGradient>
  );
};

export default UserProfileImagePicker;
