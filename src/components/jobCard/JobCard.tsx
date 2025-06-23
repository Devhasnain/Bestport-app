import {View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {navigate} from '@navigation/NavigationService';
import Typography from '@components/ui/Typography';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import {Feather} from '@components/index';
import {formatToFull12HourDateTime, getTimeAgo} from '@utils/DateFormat';
import {urgencyLevelText} from '@config/Constants';
import {Avatar} from '@rneui/themed';
import {Job} from '../../types/job';

type Props = {
  item: Job;
};

const JobCard = ({item}: Props) => {
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
        {item?.assigned_to ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              flex: 1,
            }}>
            <Avatar
              source={{uri: item?.assigned_to?.profile_img}}
              title={item?.assigned_to?.name}
              titleStyle={{
                color: colors.primaryTextLight,
                fontFamily: fonts.poppinsSemiBold,
                lineHeight: 20,
              }}
              containerStyle={{backgroundColor: colors.gray}}
              rounded
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
            {getTimeAgo(item?.createdAt?.toString())}
          </Typography>
        )}

        <TouchableOpacity
          style={{
            paddingVertical: 5,
          }}
          activeOpacity={0.7}>
          <Feather name="heart" size={20} color={colors.primaryTextLight} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(JobCard);
