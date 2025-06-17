import {
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {useModal} from '@services/hooks/useModal';
import React, {memo, useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import globalStyle from '@assets/styles';
import {images} from '@config/Images';
import {Divider} from '@rneui/themed';
import fonts from '@config/Fonts';

import BottomSheetSelector from '../bottomSheetSelector/BottomSheetSelector';
import Typography from '../typography/Typography';
import styles from './UploadImageBtn.style';
import {colors} from '@config/branding';

const UploadImageBtn = ({
  loading = false,
  disabled = false,
  selectedImage,
  setSelectedImage = () => {},
  containerStyle,
  logoBoxStyle,
  cameraButtonStyle,
  cameraIconStyle,
  trigger,
  triggerStyle,
  cameraType = 'back',
  selectionLimit = 1,
}) => {
  const {isOpen, closeModal, openModal} = useModal();

  const handleCamera = useCallback(async () => {
    try {
      const permissionType = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      });

      const result = await request(permissionType);

      if (result !== RESULTS.GRANTED) {
        Toast.show('Permission Denied Camera permission is required.');
        return;
      }

      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.8,
          cameraType: cameraType,
        },
        response => {
          if (response.didCancel) {
            Toast.show('Camera action was closed');
          } else if (response.errorCode) {
            response;
            Toast.show(`Camera error: ${response.errorMessage}`);
          } else {
            const uri =
              selectionLimit > 1 ? response.assets : response.assets?.[0];
            if (uri) {
              setSelectedImage(
                selectionLimit > 1
                  ? uri
                  : {
                      uri: uri.uri,
                      type: uri.type || 'image/jpeg',
                      name: uri.fileName || 'profile.jpg',
                      ...uri,
                    },
              );
            }
          }
          closeModal();
        },
      );
    } catch (error) {
      Toast.show('An unexpected error occurred while launching the camera');
      closeModal();
    }
  }, []);

  const handleGallery = useCallback(async () => {
    try {
      const permissionType = Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android:
          Platform.Version >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      });

      const result = await request(permissionType);

      if (result !== RESULTS.GRANTED) {
        Toast.show('Permission Denied: Gallery permission is required.');
        return;
      }

      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.8,
          selectionLimit: selectionLimit,
        },
        response => {
          if (response.didCancel) {
            Toast.show('Gallery action was cancelled');
          } else if (response.errorCode) {
            Toast.show(`Gallery error: ${response.errorMessage}`);
          } else {
            const uri =
              selectionLimit > 1 ? response.assets : response.assets?.[0];
            if (uri) {
              setSelectedImage(
                selectionLimit > 1
                  ? uri
                  : {
                      uri: uri.uri,
                      type: uri.type || 'image/jpeg',
                      name: uri.fileName || 'profile.jpg',
                      ...uri,
                    },
              );
            }
          }
          closeModal();
        },
      );
    } catch (error) {
      Toast.show('An unexpected error occurred while accessing the gallery');
      closeModal();
    }
  }, []);

  return (
    <>
      {trigger ? (
        <Pressable disabled={disabled} style={triggerStyle} onPress={openModal}>
          {trigger}
        </Pressable>
      ) : (
        <View style={[styles.logoContainer, containerStyle]}>
          <View style={[styles.logoBox, logoBoxStyle]}>
            {loading && (
              <ActivityIndicator
                color={colors.primary}
                style={{position: 'absolute', zIndex: 10}}
              />
            )}
            {selectedImage?.uri ? (
              <Image source={{uri: selectedImage?.uri}} style={styles.img} />
            ) : (
              <Image
                source={images.uploadCompanyLogo}
                resizeMode="contain"
                style={styles.img}
              />
            )}
          </View>
          <TouchableOpacity
            disabled={disabled}
            onPress={openModal}
            style={[styles.cameraButton, cameraButtonStyle]}>
            <Image
              source={images.cameraIcon}
              style={[styles.cameraIcon, cameraIconStyle]}
            />
          </TouchableOpacity>
        </View>
      )}
      {isOpen && (
        <BottomSheetSelector
          snapPoints={[]}
          isOpen={isOpen}
          closeModal={closeModal}
          trigger={<></>}>
          <View style={globalStyle.paddingBottom(10)}>
            <Pressable style={styles.option} onPress={handleCamera}>
              <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                Open Camera
              </Typography>
            </Pressable>
            <Divider width={'100%'} orientation="horizontal" />
            <Pressable style={styles.option} onPress={handleGallery}>
              <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                Open Gallery
              </Typography>
            </Pressable>
          </View>
        </BottomSheetSelector>
      )}
    </>
  );
};

export default memo(UploadImageBtn);
