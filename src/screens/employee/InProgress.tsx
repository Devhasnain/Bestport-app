import { getEmployeeInProgressJobs, getInProgressJobs, setEmployeeJobs } from '@store/jobSlice';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JobCard } from '@components/index';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';


const InProgress = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(getEmployeeInProgressJobs);
  const getJobsApi = useGet({endpoint:endpoints.jobs,autoFetch:!jobs?.length});


  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard key={index} item={item} />
    ),
    [],
  );

  useEffect(()=>{
    if(getJobsApi.data){
      dispatch(setEmployeeJobs({key:"in_progress",value:getJobsApi.data.data??[]}))
    }
  },[getJobsApi.data])


  return (
    <AppFlatlist
      refreshing={getJobsApi.loading}
      onRefresh={getJobsApi.loading}
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

export default memo(InProgress);
