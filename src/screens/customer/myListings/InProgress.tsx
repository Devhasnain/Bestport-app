import { View, Text } from 'react-native'
import React, {useCallback} from 'react';
import {Typography} from '@components/index';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import {dummyJobs} from '@config/Constants';

const InProgress = () => {
 const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <View
          style={{
            padding: 16,
            elevation: 12,
            borderRadius: 14,
            backgroundColor: 'white',
            minHeight: 100,
          }}
          key={index}>
          <Typography fontFamily={fonts.poppinsMedium}>
            {item?.title}
          </Typography>
          <Typography
            fontFamily={fonts.poppinsRegular}
            fontSize={14}
            color={colors.primaryTextLight}>
            {item?.description}
          </Typography>
        </View>
      );
    },
    [],
  );

  return (
    <AppFlatlist
      data={dummyJobs}
      renderItem={renderItems}
      contentContainerStyle={{
        gap: 18,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 12,
      }}
    />
  );
}

export default InProgress