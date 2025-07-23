import { JobCard, NoResultsFound, Typography } from '@components/index';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import { getAssignedJobs } from '@store/jobSlice';
import React, { memo, useCallback } from 'react';
import { getUser } from '@store/authSlice';
import { useSelector } from 'react-redux';
import fonts from '@config/Fonts';
import { View } from 'react-native';


type Props = {
  refreshing?: boolean;
  onRefresh?: () => void;
};

const Assigned = ({refreshing, onRefresh}: Props) => {
  const role = useSelector(getUser)?.role;
  const jobs = useSelector(getAssignedJobs);
  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard item={item} key={index} />
    ),
    [],
  );

  return (
    <AppFlatlist
      data={jobs}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={renderItems}
      renderEmptyComponent={() => (
        <>
          {role === 'employee' && (
            <View
              style={{
                paddingTop: 40,
                paddingHorizontal: 8,
                gap: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography fontFamily={fonts.poppinsMedium}>
                Stay active to receive tasks.
              </Typography>
              <Typography fontSize={14} style={{textAlign: 'center'}}>
                When your status is set to "Available for Jobs", tasks assigned
                by the admin will appear here. You’ll receive notifications
                whenever a new job is assigned to you.
              </Typography>
            </View>
          )}
          {role === 'customer' && (
            <NoResultsFound title={'No results found.'} />
          )}
        </>
      )}
      contentContainerStyle={{
        gap: 18,
        paddingTop: 10,
        paddingHorizontal: 12,
      }}
    />
  );
};

export default memo(Assigned);
