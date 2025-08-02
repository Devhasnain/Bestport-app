import { getNotifications, readNotification, setNotifications } from '@store/notificationSlice';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import { TextAccordion, Typography } from '@components/index';
import { View, TouchableOpacity, Image } from 'react-native';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import getErrorMessage from '@utils/getErrorMessage';
import Header from '@components/header/Header';
import { showToast } from '@utils/showToast';
import endpoints from '@api/endpoints';
import { usePut } from '@hooks/usePut';
import { useGet } from '@hooks/useGet';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);
  const getNotificationsApi = useGet({
    endpoint: endpoints.getNotifications,
    autoFetch: !notifications.length,
  });
  const readNotificationApi = usePut()

  const handleReadNotification = useCallback((notification:any)=>{
    try {
      dispatch(readNotification(notification?._id));
      readNotificationApi.request({path:`${endpoints.readNotification}?id=${notification?._id}`})
      navigate(notification?.redirect?.split("_")[0],{id:notification?.redirect?.split("_")[1]})
    } catch (error) {
      showToast(getErrorMessage(error))
    }
  },[]);

  const renderItem = useCallback(
    ({item}: any) => <NotificationCard item={item} onPress={()=>handleReadNotification(item)} />,
    [],
  );

  useEffect(() => {
    if (getNotificationsApi.data) {
      dispatch(
        setNotifications(getNotificationsApi.data?.data?.notifications ?? []),
      );
    }
  }, [getNotificationsApi.data]);
  return (
    <>
      <Header title="Notifications" titleFontSize={21} />
      <AppFlatlist
        refreshing={getNotificationsApi.loading}
        onRefresh={getNotificationsApi.request}
        contentContainerStyle={{paddingTop: 5, paddingHorizontal: 12, gap: 12}}
        data={notifications}
        paddingBottom={30}
        renderItem={renderItem}
      />
    </>
  );
};

const NotificationCard = ({item, onPress}: any) => {
  const isRead = item?.is_read;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        padding: 12,
        minHeight: 50,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: colors.gray,
        backgroundColor: isRead ? colors.white : colors.messageBox,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View style={{width: '15%'}}>
        <Image
          source={item?.image ? {uri: item.image} : images.appLogoLg}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            overflow: 'hidden',
            resizeMode:"cover"
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <Typography
          numberOfLines={1}
          fontSize={14}
          fontFamily={fonts.poppinsMedium}>
          {item?.title}
        </Typography>
        <TextAccordion
          text={item?.description}
          charLimit={80}
          textStyle={{fontSize: 13}}
        />
        <Typography fontSize={11} color={colors.primaryTextLight} lineHeight={14} style={{textAlign:"right"}}>2d ago</Typography>
      </View>
    </TouchableOpacity>
  );
};

export default Notifications;
