import { getEmployeeCompletedJobs, getEmployeeInProgressJobs, setEmployeeJobs, } from '@store/jobSlice';
import { AppFlatlist, JobCard } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';


type Props = {
  status: 'assigned' | 'in_progress' | 'completed';
};

const DynamicTab = ({status}: Props) => {
  const dispatch = useDispatch();
  const jobs: any = useSelector(getSelectorByStatus(status));
  const getJobsApi = useGet({
    endpoint: `${endpoints.jobs}?status=${status}`,
    autoFetch: !jobs?.length,
  });

  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard key={index} item={item} />
    ),
    [],
  );

  useEffect(() => {
    if (getJobsApi.data) {
      dispatch(
        setEmployeeJobs({key: status, value: getJobsApi.data.data ?? []}),
      );
    }
  }, [getJobsApi.data]);

  return (
    <AppFlatlist
      refreshing={getJobsApi.loading}
      onRefresh={getJobsApi.request}
      data={jobs}
      renderItem={renderItems}
      contentContainerStyle={{
        gap: 18,
        paddingTop: 10,
        paddingHorizontal: 12,
      }}
      paddingBottom={20}
    />
  );
};

const getSelectorByStatus: any = (status: string) => {
  switch (status) {
    case 'in_progress':
      return getEmployeeInProgressJobs;
    case 'completed':
      return getEmployeeCompletedJobs;
  }
};

export default DynamicTab;
