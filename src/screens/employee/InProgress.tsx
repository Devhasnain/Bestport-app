import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import React, { memo, useCallback } from 'react';
import { JobCard } from '@components/index';


const InProgress = () => {
  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard key={index} item={item} />
    ),
    [],
  );

  return (
    <AppFlatlist
      // refreshing={refreshing}
      // onRefresh={onRefresh}
      data={[]}
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
