import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, { useCallback } from 'react';
import {
  BackgroundImgContainer,
  Typography,
  Header,
  AntDesign,
  Fontisto,
  UserProfileImagePicker,
} from '@components/index';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import images from '@config/Images';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setToken, setUser } from '@store/authSlice';
const tabs = [
  {
    title: 'Edit profile',
    label: 'EditProfile',
    icon: <AntDesign name="profile" size={22} color={colors.primary} />,
  },
  {
    title: 'Change email',
    label: 'EditProfile',
    icon: <Fontisto name="email" size={22} color={colors.primary} />,
  },
  {
    title: 'Update password',
    label: 'EditProfile',
    icon: <AntDesign name="key" size={22} color={colors.primary} />,
  },
  {
    title: 'Privacy policy',
    label: 'EditProfile',
    image: images.termsIcon,
  },
  {
    title: 'Faqs',
    label: 'Faqs',
    image: images.termsIcon,
  },
  {
    title: 'Customer Support',
    label: 'EditProfile',
    image: images.customerServicesIcon,
  },
];

const Profile = () => {
  const user = useSelector(getUser);
  console.log(user)
  const dispatch = useDispatch();
  const handleLogout = useCallback(()=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    navigate("Welcome")
  },[]);

  return (
    <>
      <BackgroundImgContainer>
        <Header title="Profile" />
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:12}}
        >
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
            <UserProfileImagePicker />
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
              gap: 25,
            }}>
            {tabs.map((item, index) => (
              <TouchableOpacity
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
                {item.icon && item.icon}
                <Typography fontSize={15}>{item?.title}</Typography>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
            onPress={handleLogout}
              activeOpacity={0.8}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}>
              <Image source={images.logoutIcon} tintColor={colors.btnPrimary} />
              <Typography fontSize={15}>Logout</Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BackgroundImgContainer>
    </>
  );
};

export default Profile;
