import { TextAccordion, Typography, AppFlatlist, Header, Pagination, View, TouchableOpacity, Image, } from '@/components/index';
import { useNotifications, useReadNotification } from '@/hooks/index';
import { getErrorMessage, showErrorAlert } from '@/utils/index';
import { navigate } from '@/navigation/NavigationService';
import { images, colors, fonts } from '@/config/index';
import React, { useCallback, useState } from 'react';
import { getTimeAgo } from '@/utils/DateFormat';
import { StyleSheet } from 'react-native';


const Notifications = () => {
  const [page, setPage] = useState(1);
  const {data, isPending, error, refetch} = useNotifications({
    page,
    limit: 10,
  });
  const readNotiReq = useReadNotification();

  const handleReadNotification = (notification: any) => {
    readNotiReq.mutate(notification?._id, {
      onSuccess: () => {
        navigate(notification?.redirect?.split('_')[0], {
          id: notification?.redirect?.split('_')[1],
        });
      },
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  const renderItem = useCallback(
    ({item}: any) => (
      <NotificationCard
        item={item}
        onPress={() => handleReadNotification(item)}
      />
    ),
    [],
  );

  const handlePageChange = (e: number) => {
    setPage(Number(e));
  };

  return (
    <>
      <Header title="Notifications" titleFontSize={21} />
      <AppFlatlist
        refreshing={isPending}
        onRefresh={refetch}
        contentContainerStyle={styles.listContent}
        data={data?.data?.notifications || []}
        paddingBottom={20}
        renderItem={renderItem}
        ListFooterComponent={
          <>
            {!isPending && !error ? (
              <Pagination
                currentPage={page}
                totalPages={data?.data?.pagination?.totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              <View />
            )}
          </>
        }
        ListFooterComponentStyle={styles.listFooter}
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
      style={[
        styles.cardContainer,
        {backgroundColor: isRead ? colors.white : colors.messageBox},
      ]}>
      <View style={styles.imageWrapper}>
        <Image
          source={item?.image ? {uri: item.image} : images.appLogoLg}
          style={styles.avatar}
        />
      </View>
      <View style={styles.cardContent}>
        <Typography
          numberOfLines={1}
          fontSize={14}
          fontFamily={fonts.poppinsMedium}>
          {item?.title}
        </Typography>
        <TextAccordion
          text={item?.description}
          charLimit={60}
          textStyle={styles.accordionText}
        />
        <Typography
          fontSize={11}
          color={colors.primaryTextLight}
          lineHeight={14}
          style={styles.timeText}>
          {getTimeAgo(item?.createdAt)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 5,
    paddingHorizontal: 12,
    gap: 12,
  },
  listFooter: {
    paddingBottom: 20,
  },
  cardContainer: {
    padding: 12,
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.gray,
    display: 'flex',
    flexDirection: 'row',
  },
  imageWrapper: {
    width: '16%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
  },
  accordionText: {
    fontSize: 13,
  },
  timeText: {
    textAlign: 'right',
  },
});

export default Notifications;