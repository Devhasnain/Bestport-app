import { JobCard, AppFlatlist } from '@/components/index';
import { getInProgressJobs } from '@/store/jobSlice';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';


type Props = {
  refreshing?: boolean;
  onRefresh?: () => void;
};
const InProgress = ({refreshing, onRefresh}: Props) => {
  const jobs = useSelector(getInProgressJobs);
  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard key={index} item={item} />
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

export default memo(InProgress);
