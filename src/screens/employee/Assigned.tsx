import { getJobTickets, removeJobTicket, setEmployeeJobs } from '@store/jobSlice';
import AppFlatlist from '@components/appFlatlist/AppFlatlist';
import React, { memo, useCallback, useEffect } from 'react';
import { JobCard, Typography } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { isTicketExpired } from '@utils/DateFormat';
import { getUser } from '@store/authSlice';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';
import { View } from 'react-native';
import fonts from '@config/Fonts';


const Assigned = () => {
  const jobTickets = useSelector(getJobTickets);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const {data, loading, request} = useGet({
    endpoint:`${endpoints.jobTickets}?user=${user?._id}&active=true&status=assigned`,
    autoFetch:!jobTickets?.length&&user?._id
  });

  const renderItems = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <JobCard item={item?.job} key={index} expiredIn={item?.createdAt} />
    ),
    [],
  );

  useEffect(() => {
    if(jobTickets?.length){
      const interval = setInterval(() => {
        jobTickets.forEach(ticket => {
          if (isTicketExpired(ticket?.createdAt)) {
            dispatch(removeJobTicket(ticket._id));
          }
        });
      }, 60000);
      
      return () => clearInterval(interval);
    }
}, [jobTickets]);

  useEffect(()=>{
    if(data){
      dispatch(setEmployeeJobs({key:"assigned",value:data?.data?.tickets}))
    }
  },[data]);

  return (
    <AppFlatlist
      data={jobTickets}
      refreshing={loading}
      onRefresh={request}
      renderItem={renderItems}
      renderEmptyComponent={() => (
        <>
          <View
            style={{
              paddingTop: 40,
              paddingHorizontal: 8,
              gap: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontFamily={fonts.poppinsMedium}>
              Stay active to receive tasks.
            </Typography>
            <Typography fontSize={14} style={{textAlign: 'center'}}>
              When your status is set to "Available for Jobs", tasks assigned by
              the admin will appear here. You’ll receive notifications whenever
              a new job is assigned to you.
            </Typography>
          </View>
        </>
      )}
      contentContainerStyle={{
        gap: 18,
        paddingTop: 10,
        paddingHorizontal: 12,
      }}
    />
  );
};

export default memo(Assigned);
