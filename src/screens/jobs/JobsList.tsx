import { AppFlatlist, JobCard, Pagination, View } from '@/components/index';
import React, { useCallback, useState } from 'react';
import { JobStatus } from '@/types/index';
import { useJobs } from '@/hooks/index';


const JobsList = ({status}:{status:JobStatus}) => {
  const [page, setPage] = useState(1);
  const {data, error, isPending, refetch} = useJobs({
    page,
    limit: 10,
    status,
  });
  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard item={item} key={index} />
    ),
    [data],
  );

  const handlePageChange = (e: number) => {
    setPage(e);
  };

  return (
    <>
      <AppFlatlist
        contentContainerStyle={{paddingHorizontal: 12,gap:12, paddingTop: 12}}
        data={data?.data?.jobs || []}
        refreshing={isPending}
        onRefresh={refetch}
        renderItem={renderItems}
        ListFooterComponent={
          <>
            {!isPending && !error ? (
              <Pagination
                currentPage={page}
                totalPages={data?.data?.pagination?.totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              <View />
            )}
          </>
        }
      />
    </>
  );
};

export default JobsList;
