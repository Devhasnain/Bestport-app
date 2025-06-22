import React, {useCallback} from 'react';
import {JobCard} from '@components/index';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import {useSelector} from 'react-redux';
import {getInProgressJobs} from '@store/jobSlice';
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

export default InProgress;
