import { JobCard, AppFlatlist } from '@/components/index';
import { getPendingJobs } from '@/store/jobSlice';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';


type Props = {
  refreshing?: boolean;
  onRefresh?: () => void;
};
const Pending = ({refreshing, onRefresh}: Props) => {
  const jobs = useSelector(getPendingJobs);
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

export default memo(Pending);
