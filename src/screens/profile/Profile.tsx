import { Typography, Header, Feather, ConfirmationModal, View, ScrollView, TouchableOpacity, Image, UserAvatar, Divider, } from '@/components/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAvailability, useDeleteAccout } from '@/hooks/index';
import { showErrorAlert, getErrorMessage } from '@/utils/index';
import React, { memo, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { replace } from '@/navigation/NavigationService';
import { images, colors, fonts } from '@/config/index';
import { useAuthStore } from '@/store/index';
import { useModal } from '@/hooks/useModal';
import { StyleSheet } from 'react-native';


const tabs = [
  {
    title: 'Privacy policy',
    label: 'PrivacyPolicy',

    icon: <Feather name="file-text" color={colors.primary} size={23} />,
  },

  {
    title: 'Faqs',
    label: 'Faqs',

    icon: <Feather name="message-square" color={colors.primary} size={23} />,
  },

  {
    title: 'Customer Support',
    label: 'CustomerSupport',

    icon: <Feather name="help-circle" color={colors.primary} size={23} />,
  },
];

const Profile = ({navigation}: any) => {
  const {setOfflineAndCleanup} = useAvailability();

  const {isOpen, toggleModal} = useModal();

  const delAccountModal = useModal();

  const {user, logout} = useAuthStore();

  const {mutate: deleteAccount, isPending: isDeleting} = useDeleteAccout();

  const userName = useMemo(() => {
    return `${user?.name[0]?.toUpperCase()}${user?.name?.slice(
      1,
      user?.name?.length,
    )}`;
  }, [user?.name]);

  const handleLogout = useCallback(async () => {
    await GoogleSignin.signOut();

    setOfflineAndCleanup();

    toggleModal();

    logout();

    replace('Welcome');
  }, []);

  const handleDeleteAccount = async () => {
    deleteAccount(
      {},
      {
        onSuccess: () => {
          setOfflineAndCleanup();

          delAccountModal.closeModal();

          replace('Welcome');

          logout();
        },

        onError: error => showErrorAlert('Error', getErrorMessage(error)),
      },
    );
  };

  const handleRedirect = useCallback((screen: string) => {
    navigation?.navigate(screen);
  }, []);

  return (
    <>
      <Header title="Profile" titleFontSize={21} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <UserAvatar
            image={user?.profile_img?.path}
            name={user?.name}
            size={60}
          />

          <View>
            <Typography
              fontFamily={fonts.poppinsMedium}
              fontSize={18}
              numberOfLines={1}
              color={colors.white}>
              {userName}
            </Typography>

            <Typography
              fontFamily={fonts.poppinsRegular}
              fontSize={14}
              color={colors.white}
              lineHeight={18}
              numberOfLines={1}>
              {user?.email}
            </Typography>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <InputBtn title="Name" value={user?.name ?? ''} redirect="EditName" />

          <InputBtn
            title="Email"
            value={user?.email ?? ''}
            redirect="EditEmail"
          />

          {/* <InputBtn
            title="Password"
            value="***********"
            redirect="EditPassword"
          /> */}

          <Divider orientation="horizontal" style={styles.divider} />

          {/* Links */}
          <View style={styles.linksWrapper}>
            {tabs.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleRedirect(item.label)}
                style={styles.linkItem}>
                {item.icon}

                <Typography fontSize={15}>{item.title}</Typography>
              </TouchableOpacity>
            ))}

            {/* Logout */}
            <TouchableOpacity
              onPress={toggleModal}
              activeOpacity={0.8}
              style={styles.linkItem}>
              <Image source={images.logoutIcon} tintColor={colors.btnPrimary} />

              <Typography fontSize={15}>Logout</Typography>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity
              onPress={delAccountModal.openModal}
              activeOpacity={0.8}
              style={styles.deleteBtn}>
              <Typography
                color={colors.white}
                style={styles.deleteText}
                fontSize={15}>
                Delete Account
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <ConfirmationModal
        isOpen={isOpen}
        title="Are you sure, You want to logout?"
        onCancel={toggleModal}
        onConfirm={handleLogout}
      />

      {/* Delete Account Modal */}
      <ConfirmationModal
        isOpen={delAccountModal.isOpen}
        title="Are you sure, You want to delete your account?"
        description="Your account and data will be permanently erased in 30 days. If you change your mind, simply log in before then to reactivate your account and cancel the deletion."
        onCancel={delAccountModal.closeModal}
        onConfirm={handleDeleteAccount}
        loading={isDeleting}
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
    navigation.navigate(redirect);
  }, [redirect]);

  return (
    <View style={styles.inputWrapper}>
      <Typography fontSize={14} color={colors.primaryTextLight}>
        {title}
      </Typography>

      <Typography
        fontSize={15}
        style={styles.inputField}
        color={colors.primaryTextLight}
        onPress={handleRedirect}>
        {value}
      </Typography>
    </View>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 90,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  formSection: {
    paddingTop: 25,
    gap: 10,
  },

  divider: {
    marginVertical: 12,
  },

  linksWrapper: {
    gap: 20,
  },

  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  deleteBtn: {
    backgroundColor: colors.authLinkText,
    padding: 15,
    borderRadius: 12,
      marginTop: 30,
  },

  deleteText: {
    textAlign: 'center',
    width: '100%',
  },

  inputWrapper: {
    gap: 3,
  },

  inputField: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default Profile;
