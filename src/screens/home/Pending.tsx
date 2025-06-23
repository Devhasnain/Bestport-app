import React, {useCallback} from 'react';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import {JobCard} from '@components/index';
import {useSelector} from 'react-redux';
import {getPendingJobs} from '@store/jobSlice';

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

export default Pending;
