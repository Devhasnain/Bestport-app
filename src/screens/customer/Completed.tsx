import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import { getCompletedJobs } from '@store/jobSlice';
import React, { memo, useCallback } from 'react';
import { JobCard } from '@components/index';
import { useSelector } from 'react-redux';


type Props = {
  refreshing?: boolean;
  onRefresh?: () => void;
};
const Completed = ({refreshing, onRefresh}: Props) => {
  const jobs = useSelector(getCompletedJobs);
  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard item={item} key={index} />
    ),
    [],
  );

  return (
    <AppFlatlist
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={jobs}
      renderItem={renderItems}
      contentContainerStyle={{
        gap: 18,
        paddingTop: 10,
        paddingHorizontal: 12,
      }}
    />
  );
};

export default memo(Completed);
