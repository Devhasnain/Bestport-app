import { formatToFull12HourDateTime, getTicketExpiryText, getTimeAgo, } from '@/utils/DateFormat';
import { Typography, UserAvatar, Feather } from '@/components/index';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { urgencyLevelText, colors, fonts } from '@/config/index';
import { navigate } from '@/navigation/NavigationService';
import React, { memo } from 'react';
import { Job } from '@/types/index';

import { useAuthStore } from '../store';
import { JobStatus } from './JobStatus';


type Props = {
  item: Job;
  canLike?: boolean;
  expiredIn?: Date;
};

const InfoBadge = ({icon, label}: {icon: string; label: string}) => (
  <View style={styles.infoBadge}>
    <Feather name={icon} size={12} color={colors.primaryTextLight} />
    <Typography fontSize={12} color={colors.primaryTextLight}>{label}</Typography>
  </View>
);

export const JobCard = memo(({item, canLike, expiredIn}: Props) => {
  const user = useAuthStore(state => state.user);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate('JobDetail', {id: item?._id})}
      style={styles.card}>

      {/* Top: title + status */}
      <View style={styles.topRow}>
        <View style={{flex: 1, paddingRight: 10}}>
          <Typography fontFamily={fonts.poppinsMedium} fontSize={15}>
            {item?.title}
          </Typography>
          <Typography
            fontFamily={fonts.poppinsRegular}
            fontSize={13}
            color={colors.primaryTextLight}
            numberOfLines={2}
            style={{marginTop: 3, lineHeight: 19}}>
            {item?.description}
          </Typography>
        </View>
        <JobStatus status={item?.status||""} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Info badges */}
      <View style={styles.badgesRow}>
        <InfoBadge icon="clock" label={formatToFull12HourDateTime(item?.preferred_date)} />
        <InfoBadge icon="map-pin" label={item?.city} />
        <InfoBadge icon="tool" label={item?.service_type} />
        <InfoBadge icon="zap" label={urgencyLevelText(item?.urgency ?? '')||""} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom: assigned user or time */}
      <View style={styles.bottomRow}>
        {item?.assigned_to && user?.role === 'customer' ? (
          <View style={styles.userRow}>
            <UserAvatar
              image={item?.assigned_to?.profile_img?.path}
              name={item?.assigned_to?.name}
              size={36}
              fontSize={16}
            />
            <View>
              <Typography fontSize={13} fontFamily={fonts.poppinsMedium}>
                {item?.assigned_to?.name}
              </Typography>
              <Typography fontSize={11.5} color={colors.primaryTextLight} lineHeight={15}>
                {getTimeAgo(item?.createdAt?.toString())}
              </Typography>
            </View>
          </View>
        ) : (
          <Typography fontSize={11.5} color={colors.primaryTextLight}>
            {expiredIn
              ? getTicketExpiryText(expiredIn)
              : getTimeAgo(item?.createdAt?.toString())}
          </Typography>
        )}

        {canLike && (
          <Feather name="heart" size={19} color={colors.primaryTextLight} />
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#EBEBEB',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: colors.cardBadgeDark,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
});