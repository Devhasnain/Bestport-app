import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import { View, TouchableOpacity, Image } from 'react-native';
import Header from '@components/header/Header';
import { Typography } from '@components/index';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import React from 'react';


const notifications = [
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'New Message',
    text: 'You have received a new message from John.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Friend Request',
    text: 'Anna sent you a friend request.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Reminder',
    text: "Don't forget your meeting at 3 PM today.",
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Update Available',
    text: 'A new version of the app is available to download.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'System Alert',
    text: 'Suspicious login detected on your account.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'New Message',
    text: 'You have received a new message from John.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Friend Request',
    text: 'Anna sent you a friend request.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Reminder',
    text: "Don't forget your meeting at 3 PM today.",
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Update Available',
    text: 'A new version of the app is available to download.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'System Alert',
    text: 'Suspicious login detected on your account.',
  },
];

const Notifications = () => {
  return (
    <>
      <Header title="Notifications" titleFontSize={21}/>
      <AppFlatlist
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12, gap: 12}}
        data={notifications}
        renderItem={({item, index}: any) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={{
              padding: 12,
              minHeight: 50,
              borderRadius: 12,
              borderWidth: 0.8,
              borderColor: colors.gray,
              backgroundColor: colors.white,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{width: '18%'}}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  overflow: 'hidden',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Typography fontSize={14} fontFamily={fonts.poppinsMedium}>
                {item?.title}
              </Typography>
              <Typography fontSize={12.5} fontFamily={fonts.poppinsRegular}>
                {item?.text}
              </Typography>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default Notifications;
