import { BackgroundImgContainer, Typography, Header, UserProfileImagePicker, } from '@components/index';
import ConfirmationModal from '@components/confirmationalModal/ConfirmationModal';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getUser, setToken, setUser } from '@store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { getSocket } from '@services/socket';
import { useModal } from '@hooks/useModal';
import { Divider } from '@rneui/themed';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { showToast } from '@utils/showToast';


const tabs = [
  {
    title: 'Privacy policy',
    label: 'PrivacyPolicy',
    image: images.termsIcon,
  },
  {
    title: 'Faqs',
    label: 'Faqs',
    image: images.termsIcon,
  },
  {
    title: 'Customer Support',
    label: 'CustomerSupport',
    image: images.customerServicesIcon,
  },
];

const Profile = ({navigation}: any) => {
  const {isOpen, toggleModal} = useModal();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const handleLogout = useCallback(async () => {
    const socket = getSocket();
    socket?.disconnect();
    dispatch(setToken(null));
    dispatch(setUser(null));
    toggleModal();
    navigate('Welcome');
    await GoogleSignin.signOut();
  }, []);

  const handleRedirect = useCallback((screen: string) => {
    navigation?.navigate(screen);
  }, []);

  return (
    <>
      <BackgroundImgContainer>
        <Header title="Profile" titleFontSize={21} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
              backgroundColor: colors.primary,
              padding: 16,
              borderRadius: 12,
            }}>
            <UserProfileImagePicker user={user} />
            <View>
              <Typography
                fontFamily={fonts.poppinsMedium}
                fontSize={16}
                color={colors.white}>
                {user?.name}
              </Typography>
              <Typography
                fontFamily={fonts.poppinsRegular}
                fontSize={14}
                color={colors.white}>
                {user?.email}
              </Typography>
            </View>
          </View>

          <View
            style={{
              paddingTop: 25,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
            <InputBtn title="Name" value={user?.name} redirect="EditName" />
            <InputBtn title="Email" value={user?.email} redirect="EditEmail" />
            <InputBtn
              title="Password"
              value={'***********'}
              redirect="EditPassword"
            />

            <Divider orientation="horizontal" style={{marginVertical: 12}} />
            <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
              {tabs.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleRedirect(item.label)}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                  {item.image && (
                    <Image source={item.image} tintColor={colors.btnPrimary} />
                  )}
                  <Typography fontSize={15}>{item?.title}</Typography>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={toggleModal}
                activeOpacity={0.8}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}>
                <Image
                  source={images.logoutIcon}
                  tintColor={colors.btnPrimary}
                />
                <Typography fontSize={15}>Logout</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </BackgroundImgContainer>
      <ConfirmationModal
        isOpen={isOpen}
        title="Are you sure, You want to logout?"
        onCancel={toggleModal}
        onConfirm={handleLogout}
      />
    </>
  );
};

type InputBtnProps = {
  title?: string;
  value?: string;
  redirect?: string;
};

const InputBtn = memo(({title, value, redirect}: InputBtnProps) => {
  const navigation = useNavigation<any>();
  const handleRedirect = useCallback(() => {
    showToast("Test Notification")
    // navigation.navigate(redirect);
  }, [redirect]);
  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
      <Typography fontSize={14} color={colors.primaryTextLight}>
        {title}
      </Typography>
      <Typography
        fontSize={15}
        style={{
          backgroundColor: colors.white,
          borderWidth: 0.5,
          borderRadius: 6,
          borderColor: colors.inputBorder,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
        color={colors.primaryTextLight}
        onPress={handleRedirect}>
        {value}
      </Typography>
    </View>
  );
});

export default Profile;
