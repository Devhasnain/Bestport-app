import { AppFlatlist, EmptyState, JobCard, Pagination } from '@/components/index';
import React, { useCallback, useState } from 'react';
import { useJobTickets } from '@/hooks/index';
import { useAuthStore } from '@/store/index';
import { View } from 'react-native';


const TicketsList = () => {
  const [page, setPage] = useState(1);
  const user = useAuthStore(state => state.user);
  const {data, isPending, refetch, error} = useJobTickets({
    id: user?._id || '',
    page: 1,
    limit: 10,
  });
  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard item={item?.job} key={index} expiredIn={item?.createdAt} />
    ),
    [],
  );
  const handlePageChange = (e: number) => {
    setPage(e);
  };
  return (
    <>
      <AppFlatlist
        contentContainerStyle={{paddingHorizontal: 12, gap: 12, paddingTop: 12}}
        data={data?.data?.tickets || []}
        refreshing={isPending}
        onRefresh={refetch}
        renderItem={renderItems}
        ListEmptyComponent={<EmptyState />}
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

export default TicketsList;
