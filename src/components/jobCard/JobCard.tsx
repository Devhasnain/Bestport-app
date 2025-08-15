import { formatToFull12HourDateTime, getTicketExpiryText, getTimeAgo, } from '@utils/DateFormat';
import { navigate } from '@navigation/NavigationService';
import { View, TouchableOpacity } from 'react-native';
import { urgencyLevelText } from '@config/Constants';
import Typography from '@components/ui/Typography';
import UserAvatar from '@components/UserAvatar';
import { Feather } from '@components/index';
import { getUser } from '@store/authSlice';
import { useSelector } from 'react-redux';
import { Avatar } from '@rneui/themed';
import React, { memo } from 'react';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import { Job } from '../../types/job';


type Props = {
  item: Job;
  canLike?: boolean;
  expiredIn?: Date;
};

const JobCard = ({item, canLike, expiredIn}: Props) => {
  const user = useSelector(getUser);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigate('JobDetail', {id: item?._id})}
      style={{
        padding: 16,
        elevation: 12,
        borderRadius: 14,
        backgroundColor: 'white',
        minHeight: 100,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.15,
        shadowRadius: 10,
      }}>
      <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Typography fontFamily={fonts.poppinsMedium}>{item?.title}</Typography>
        <Typography
          fontFamily={fonts.poppinsRegular}
          fontSize={14}
          color={colors.primaryTextLight}
          numberOfLines={2}>
          {item?.description}
        </Typography>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            backgroundColor: colors.cardBadgeDark,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Feather name="clock" size={12.8} color={colors.primaryTextLight} />
          <Typography fontSize={12.5} color={colors.primaryTextLight}>
            {formatToFull12HourDateTime(item?.preferred_date)}
          </Typography>
        </View>

        <View
          style={{
            backgroundColor: colors.cardBadgeDark,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Feather name="map-pin" size={12.4} color={colors.primaryTextLight} />
          <Typography fontSize={12.5} color={colors.primaryTextLight}>
            {item?.city}
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: colors.cardBadgeDark,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Typography fontSize={12.5} color={colors.primaryTextLight}>
            {item?.service_type}
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: colors.cardBadgeDark,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Typography fontSize={12.5} color={colors.primaryTextLight}>
            {urgencyLevelText(item?.urgency ?? '')}
          </Typography>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {item?.assigned_to && user?.role === "customer" ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
            }}>
            <UserAvatar
              image={item?.assigned_to?.profile_img?.path}
              name={item?.assigned_to?.name}
              size={37}
              fontSize={18}
            />
            <View>
              <Typography fontSize={13}>{item?.assigned_to?.name}</Typography>
              <Typography
                fontSize={11.5}
                color={colors.primaryTextLight}
                lineHeight={14}>
                {getTimeAgo(item?.createdAt?.toString())}
              </Typography>
            </View>
          </View>
        ) : (
          <Typography
            fontSize={11.5}
            color={colors.primaryTextLight}
            lineHeight={14}>
            {expiredIn
              ? getTicketExpiryText(expiredIn)
              : getTimeAgo(item?.createdAt?.toString())}
          </Typography>
        )}
        {canLike && (
          <Feather name="heart" size={20} color={colors.primaryTextLight} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(JobCard);
