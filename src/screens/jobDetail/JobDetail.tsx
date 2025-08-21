import { formatToFull12HourDateTime, getTimeAgo, isTicketExpired, } from '@utils/DateFormat';
import React, { memo, ReactNode, useCallback, useEffect, useMemo, useState, } from 'react';
import { formatJobStatus, getStatusColor, urgencyLevelText, } from '@config/Constants';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { Header, NoResultsFound, Typography } from '@components/index';
import { addEmployeeJobs, removeJobTicket } from '@store/jobSlice';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from '@utils/getErrorMessage';
import UserAvatar from '@components/UserAvatar';
import { Button, Divider } from '@rneui/themed';
import { showToast } from '@utils/showToast';
import { getUser } from '@store/authSlice';
import endpoints from '@api/endpoints';
import { usePut } from '@hooks/usePut';
import { useGet } from '@hooks/useGet';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import { Job, JobMeta } from '../../types/job';


const JobDetail = ({route}: any) => {
  const user = useSelector(getUser);
  const {id} = route?.params;
  const [job, setJob] = useState<Job>();
  const [jobMeta, setJobMeta] = useState<JobMeta>();
  const {data, request, loading} = useGet({
    endpoint: `${endpoints.jobs}/${id}`,
    autoFetch: id && !job,
  });

  const viewEmployeeProfile = useCallback(() => {
    if (user?.role === 'employee') {
      navigate('Profile');
    } else {
      navigate('EmployeeProfile', {id: job?.assigned_to?._id});
    }
  }, [job?.assigned_to, user]);

  const redirectToComplete = useCallback(() => {
    navigate('CompleteJob', {id: job?._id});
  }, [job]);

  const redirectToReview = useCallback(() => {
    navigate('ReviewJob', {employee: job?.assigned_to, jobId:job?._id});
  }, [job]);

  useEffect(() => {
    if (data?.data) {
      setJob(data?.data?.job);
      setJobMeta(data?.data?.meta);
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
              <Typography fontSize={12.5} color={colors.white}>
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {user?.role === 'customer' && job?.assigned_to && (
                  <TouchableOpacity
                    onPress={viewEmployeeProfile}
                    activeOpacity={0.8}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <UserAvatar
                      image={job?.assigned_to?.profile_img?.path}
                      name={job?.assigned_to?.name}
                      size={35}
                      fontSize={15}
                    />
                    <View>
                      <Typography fontSize={14}>
                        {job?.assigned_to?.name}
                      </Typography>
                    </View>
                  </TouchableOpacity>
                )}

                <Typography fontSize={12}>
                  {getTimeAgo(job?.createdAt ?? '')}
                </Typography>
              </View>
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

      {jobMeta?.canCompleteJob && (
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 12,
            backgroundColor: colors.white,
            elevation: 20,
          }}>
          <Button
            onPress={redirectToComplete}
            disabledStyle={{backgroundColor: colors.btnDisabled}}
            disabledTitleStyle={{color: colors.white}}
            title={'Complete job'}
            buttonStyle={{
              backgroundColor: colors.btnPrimary,
              borderRadius: 12,
              minHeight: 50,
            }}
          />
        </View>
      )}

      {jobMeta?.canEmployeeIntract && (
        <AcceptJobTicket job={job} setJob={setJob} />
      )}

      {jobMeta?.canReviewJob && (
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 12,
            backgroundColor: colors.white,
            elevation: 20,
          }}>
          <Button
            onPress={redirectToReview}
            disabledStyle={{backgroundColor: colors.btnDisabled}}
            disabledTitleStyle={{color: colors.white}}
            title={'Review'}
            buttonStyle={{
              backgroundColor: colors.btnPrimary,
              borderRadius: 12,
              minHeight: 50,
            }}
          />
        </View>
      )}
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

const AcceptJobTicket = memo(
  ({job, setJob}: {job?: Job; setJob: (val: Job) => void}) => {
    const dispatch = useDispatch();
    const [ticket, setTicket] = useState<any>(null);
    const rejectTicketApi = usePut();
    const getTicketApi = useGet({
      endpoint: `${endpoints.getTicketByJob}?job=${job?._id}`,
      autoFetch: job && !ticket,
    });
    const acceptJobTicketApi = usePut();

    const disableReject = useMemo(() => {
      return ticket?.status === 'rejected' || ticket?.status === 'accepted';
    }, [ticket]);

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
        setTicket((pre: any) => ({...pre, status: 'accepted'}));
        showToast('Job ticket accept successfully');
      } catch (error) {
        showToast(getErrorMessage(error));
      }
    };

    const handleRejectTicket = async () => {
      try {
        await rejectTicketApi.request({
          path: `${endpoints.rejectJobTicket}?ticketId=${ticket?._id}`,
        });
        setTicket((pre: any) => ({...pre, status: 'rejected'}));
        dispatch(removeJobTicket(ticket?._id));
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
        {ticket && ticket?.status === 'assigned' ? (
          <View
            style={{
              paddingVertical: 14,
              paddingHorizontal: 12,
              backgroundColor: colors.white,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              elevation: 20,
            }}>
            <Button
              onPress={handleAcceptJob}
              disabledStyle={{backgroundColor: colors.btnDisabled}}
              loading={acceptJobTicketApi.loading}
              disabled={
                isTicketExpired(ticket?.createdAt) ||
                getTicketApi?.loading ||
                acceptJobTicketApi.loading
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
            <Button
              onPress={handleRejectTicket}
              disabledStyle={{backgroundColor: 'transparent'}}
              loading={rejectTicketApi.loading}
              loadingProps={{
                color: colors.btnPrimary,
              }}
              disabled={rejectTicketApi.loading || disableReject}
              disabledTitleStyle={{color: colors.primaryTextLight}}
              titleStyle={{color: colors.btnPrimary}}
              title={ticket?.status === 'rejected' ? 'Rejected' : 'Reject'}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderRadius: 12,
                minHeight: 50,
                borderWidth: 1.5,
                borderColor: disableReject
                  ? colors.btnDisabled
                  : colors.btnPrimary,
              }}
            />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  },
);

export default JobDetail;
