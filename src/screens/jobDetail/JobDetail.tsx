import { formatToFull12HourDateTime, getTimeAgo, isTicketExpired, } from '@utils/DateFormat';
import { formatJobStatus, getStatusColor, urgencyLevelText, } from '@config/Constants';
import { Header, NoResultsFound, Typography } from '@components/index';
import React, { memo, ReactNode, useEffect, useState } from 'react';
import { addEmployeeJobs, removeJobTicket } from '@store/jobSlice';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from '@utils/getErrorMessage';
import { Button, Divider } from '@rneui/themed';
import { showToast } from '@utils/showToast';
import { getUser } from '@store/authSlice';
import endpoints from '@api/endpoints';
import { usePut } from '@hooks/usePut';
import { useGet } from '@hooks/useGet';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import { Job } from '../../types/job';


const JobDetail = ({route}: any) => {
  const user = useSelector(getUser);
  const {id} = route?.params;
  const [job, setJob] = useState<Job>();
  const {data, request, loading} = useGet({
    endpoint: `${endpoints.jobs}/${id}`,
    autoFetch: id && !job,
  });

  useEffect(() => {
    if (data?.data) {
      setJob(data?.data);
    }
  }, [data]);

  return (
    <>
      <Header leftIcon style={{justifyContent: 'space-between'}}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          {job?.createdAt && (
            <View
              style={{
                backgroundColor: colors.cardBadgeDark,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 100,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}>
              <Typography fontSize={12.5} color={colors.primaryTextLight}>
                {getTimeAgo(job?.createdAt)}
              </Typography>
            </View>
          )}
          {job?.status && (
            <View
              style={{
                backgroundColor: getStatusColor(job?.status),
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 100,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}>
              <Typography fontSize={12.5} color={colors.primaryTextLight}>
                {formatJobStatus(job?.status)}
              </Typography>
            </View>
          )}
        </View>
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={request}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingVertical: 10,
          paddingTop: 5,
          paddingHorizontal: 12,
        }}>
        {!loading && job ? (
          <>
            <View
              style={{
                borderRadius: 12,
                padding: 18,
                backgroundColor: colors.white,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderWidth: 0.5,
                borderColor: colors.gray,
                elevation: 8,
              }}>
              <Typography fontSize={18} fontFamily={fonts.poppinsMedium}>
                {job?.title}
              </Typography>
              <Typography fontSize={15}>{job?.description}</Typography>
              <Typography fontSize={12}>
                {getTimeAgo(job?.createdAt ?? '')}
              </Typography>
            </View>
            <SectionCard title="Service type">
              <Typography fontSize={14}>{job?.service_type}</Typography>
            </SectionCard>
            <SectionCard title="Urgency">
              <Typography fontSize={14}>
                {urgencyLevelText(job?.urgency ?? '')}
              </Typography>
            </SectionCard>
            <SectionCard title="Preferred Date and Time">
              <Typography fontSize={14}>
                {formatToFull12HourDateTime(job?.preferred_date ?? '')}
              </Typography>
            </SectionCard>
            {job?.instructions && (
              <SectionCard title="Instructions">
                <Typography fontSize={14}>{job?.instructions}</Typography>
              </SectionCard>
            )}
            <SectionCard title="Location">
              <Row>
                <Typography fontSize={13} fontFamily={fonts.poppinsMedium}>
                  City
                </Typography>

                <Typography fontSize={13}>{job?.city}</Typography>
              </Row>
              <Row>
                <Typography fontSize={13} fontFamily={fonts.poppinsMedium}>
                  Post code
                </Typography>

                <Typography fontSize={13}>{job?.post_code}</Typography>
              </Row>

              <Typography fontSize={13} fontFamily={fonts.poppinsMedium}>
                Address
              </Typography>
              <Typography fontSize={13}>{job?.address}</Typography>
            </SectionCard>
          </>
        ) : !loading && !job && !data?.data ? (
          <NoResultsFound title={'Job not found.'} />
        ) : (
          <></>
        )}
      </ScrollView>

      {user?.role === 'employee' && <AcceptJobTicket job={job} />}
    </>
  );
};

type SectionCarProps = {
  title: string;
  children: ReactNode;
};

const SectionCard = memo(({title, children}: SectionCarProps) => {
  return (
    <View
      style={{
        borderRadius: 12,
        padding: 18,
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        borderWidth: 0.5,
        borderColor: colors.gray,
        elevation: 15,
      }}>
      <Typography fontSize={14} fontFamily={fonts.poppinsMedium}>
        {title}
      </Typography>
      <Divider orientation="horizontal" />
      {children}
    </View>
  );
});

const Row = memo(({children}: any) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    {children}
  </View>
));

const AcceptJobTicket = memo(({job}: {job?: Job}) => {
  const dispatch = useDispatch();
  const [ticket, setTicket] = useState<any>(null);
  const getTicketApi = useGet({
    endpoint: `${endpoints.getTicketByJob}?job=${job?._id}`,
    autoFetch: job && !ticket,
  });
  const acceptJobTicketApi = usePut();

  const handleAcceptJob = async () => {
    try {
      if (!ticket?._id) {
        throw new Error('Job ticket was expired or not available');
      }

      await acceptJobTicketApi.request({
        path: `${endpoints.AcceptJobTicket}?ticketId=${ticket._id}`,
      });
      dispatch(removeJobTicket(ticket?._id));
      dispatch(addEmployeeJobs({key: 'in_progress', value: job}));
      setTicket((pre:any)=>({...pre,status:"accepted"}))
      showToast("Job ticket accept successfully")
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (getTicketApi?.data) {
      setTicket(getTicketApi?.data?.data?.ticket);
    }
  }, [getTicketApi?.data]);

  return (
    <>
      {ticket && ticket?.status !== 'accepted' ? (
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 12,
            backgroundColor: colors.white,
          }}>
          <Button
            onPress={handleAcceptJob}
            disabledStyle={{backgroundColor: colors.btnDisabled}}
            loading={acceptJobTicketApi.loading}
            disabled={
              isTicketExpired(ticket?.createdAt) || getTicketApi?.loading || acceptJobTicketApi.loading
            }
            disabledTitleStyle={{color: colors.white}}
            title={
              isTicketExpired(ticket?.createdAt)
                ? 'Job ticket expired'
                : 'Accept job ticket'
            }
            buttonStyle={{
              backgroundColor: colors.btnPrimary,
              borderRadius: 12,
              minHeight: 50,
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
});

export default JobDetail;
