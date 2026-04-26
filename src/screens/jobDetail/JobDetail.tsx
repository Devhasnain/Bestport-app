import { Header, NoResultsFound, Typography, UserAvatar, View, TouchableOpacity, ScrollView, RefreshControl, Button, Divider } from '@components/index';
import { showToast, getErrorMessage, formatToFull12HourDateTime, getTimeAgo, isTicketExpired, } from '@utils/index';
import { colors, fonts, formatJobStatus, getStatusColor, urgencyLevelText } from '@config/index';
import React, { memo, ReactNode, useCallback, useEffect, useMemo, useState, } from 'react';
import { addEmployeeJobs, removeJobTicket } from '@store/jobSlice';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@styles/jobDetail.styles';
import { usePut, useGet } from '@hooks/index';
import { getUser } from '@store/authSlice';
import endpoints from '@api/endpoints';

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
      <Header leftIcon style={styles.header}>
        <View style={styles.headerBadgeRow}>
          {job?.createdAt && (
            <View style={styles.timeAgoBadge}>
              <Typography fontSize={12.5} color={colors.primaryTextLight}>
                {getTimeAgo(job?.createdAt)}
              </Typography>
            </View>
          )}
          {job?.status && (
            <View style={[styles.statusBadge, {backgroundColor: getStatusColor(job?.status)}]}>
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
        contentContainerStyle={styles.scrollContent}>
        {!loading && job ? (
          <>
            <View style={styles.jobInfoCard}>
              <Typography fontSize={18} fontFamily={fonts.poppinsMedium}>
                {job?.title}
              </Typography>
              <Typography fontSize={15}>{job?.description}</Typography>
              <View style={styles.assignedToRow}>
                {user?.role === 'customer' && job?.assigned_to && (
                  <TouchableOpacity
                    onPress={viewEmployeeProfile}
                    activeOpacity={0.8}
                    style={styles.employeeProfile}>
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
        <View style={styles.bottomActionContainer}>
          <Button
            onPress={redirectToComplete}
            disabledStyle={styles.btnDisabled}
            disabledTitleStyle={styles.btnDisabledTitle}
            title={'Complete job'}
            buttonStyle={styles.btnPrimary}
          />
        </View>
      )}

      {jobMeta?.canEmployeeIntract && (
        <AcceptJobTicket job={job} setJob={setJob} />
      )}

      {jobMeta?.canReviewJob && (
        <View style={styles.bottomActionContainer}>
          <Button
            onPress={redirectToReview}
            disabledStyle={styles.btnDisabled}
            disabledTitleStyle={styles.btnDisabledTitle}
            title={'Review'}
            buttonStyle={styles.btnPrimary}
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
    <View style={styles.sectionCard}>
      <Typography fontSize={14} fontFamily={fonts.poppinsMedium}>
        {title}
      </Typography>
      <Divider orientation="horizontal" />
      {children}
    </View>
  );
});

const Row = memo(({children}: any) => (
  <View style={styles.spaceBetweenRow}>
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
          <View style={styles.ticketActionsContainer}>
            <Button
              onPress={handleAcceptJob}
              disabledStyle={styles.btnDisabled}
              loading={acceptJobTicketApi.loading}
              disabled={
                isTicketExpired(ticket?.createdAt) ||
                getTicketApi?.loading ||
                acceptJobTicketApi.loading
              }
              disabledTitleStyle={styles.btnDisabledTitle}
              title={
                isTicketExpired(ticket?.createdAt)
                  ? 'Job ticket expired'
                  : 'Accept job ticket'
              }
              buttonStyle={styles.btnPrimary}
            />
            <Button
              onPress={handleRejectTicket}
              disabledStyle={styles.btnRejectDisabled}
              loading={rejectTicketApi.loading}
              loadingProps={{color: colors.btnPrimary}}
              disabled={rejectTicketApi.loading || disableReject}
              disabledTitleStyle={styles.btnRejectDisabledTitle}
              titleStyle={styles.btnRejectTitle}
              title={ticket?.status === 'rejected' ? 'Rejected' : 'Reject'}
              buttonStyle={[
                styles.btnReject,
                {borderColor: disableReject ? colors.btnDisabled : colors.btnPrimary},
              ]}
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