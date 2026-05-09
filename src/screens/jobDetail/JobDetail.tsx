import { Header, NoResultsFound, Typography, UserAvatar, View, TouchableOpacity, ScrollView, RefreshControl, Button, Divider, MaterialIcons } from '@/components/index'; // MaterialIcons add kiya
import { showToast, getErrorMessage, formatToFull12HourDateTime, getTimeAgo, isTicketExpired, showErrorAlert } from '@/utils/index';
import { colors, fonts, formatJobStatus, getStatusColor, urgencyLevelText } from '@/config/index';
import { useAcceptJobTicket, useRejectJobTicket } from '@/hooks/index';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { navigate } from '@/navigation/NavigationService';
import { Job, JobMeta } from '@/types/job.types';
import styles from '@/styles/jobDetail.styles';
import { useAuthStore } from '@/store/index';
import { useJobById } from '@/hooks/index';
import { StyleSheet } from 'react-native';


const JobDetail = ({ route }: any) => {
  const user = useAuthStore(state => state.user);
  const { id } = route?.params;
  const [job, setJob] = useState<Job>();
  const [jobTicket, setJobTicket] = useState<Job>();
  const [jobMeta, setJobMeta] = useState<JobMeta>();
  const { data, isPending: loading, refetch } = useJobById(id);

  const viewEmployeeProfile = useCallback(() => {
    if (user?.role === 'customer' && job?.assigned_to?._id) {
      navigate('EmployeeProfile', { id: job?.assigned_to?._id });
    }
  }, [job?.assigned_to, user]);

  const redirectToComplete = useCallback(() => {
    if (!job?._id) return;
    navigate('CompleteJob', {
      jobId: job?._id,
      customerId: job?.customer?._id || '',
      employeeId: job?.assigned_to?._id || '',
    });
  }, [job]);

  const redirectToReview = useCallback(() => {
    if (!job?.assigned_to || !job?._id) return;
    navigate('ReviewJob', { employee: job?.assigned_to, jobId: job?._id });
  }, [job]);

  useEffect(() => {
    if (data?.data) {
      setJob(data?.data?.job);
      setJobMeta(data?.data?.meta);
      setJobTicket(data?.data?.ticket);
    }
  }, [data]);

  return (
    <>
      <Header leftIcon style={styles.header}>
        <View style={styles.headerBadgeRow}>
          {job?.status && (
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job?.status), borderRadius: 8 }]}>
              <Typography fontSize={12} fontFamily={fonts.poppinsMedium} color={colors.white}>
                {formatJobStatus(job?.status)}
              </Typography>
            </View>
          )}
        </View>
      </Header>

      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} colors={[colors.primary]} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
      >
        {!loading && job ? (
          <>
            {/* Title Section */}
            <View style={localStyles.topSection}>
              <Typography fontSize={22} fontFamily={fonts.poppinsSemiBold} color="#1A1A1A">
                {job?.title}
              </Typography>
              <View style={localStyles.timeRow}>
                <MaterialIcons name="access-time" size={14} color={colors.primaryTextLight} />
                <Typography fontSize={13} color={colors.primaryTextLight} style={{ marginLeft: 4 }}>
                  Posted {getTimeAgo(job?.createdAt ?? '')}
                </Typography>
              </View>
            </View>

            {/* Description Card */}
            <View style={localStyles.infoCard}>
              <Typography fontSize={14} color="#4A4A4A" style={{ lineHeight: 22 }}>
                {job?.description}
              </Typography>
            </View>

            {/* Assignment Section (If Customer) */}
            {user?.role === 'customer' && job?.assigned_to && (
              <TouchableOpacity onPress={viewEmployeeProfile} activeOpacity={0.8} style={localStyles.assignmentCard}>
                <View style={localStyles.rowCenter}>
                  <UserAvatar
                    image={job?.assigned_to?.profile_img?.path}
                    name={job?.assigned_to?.name}
                    size={45}
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Typography fontSize={13} color={colors.primaryTextLight}>Assigned Professional</Typography>
                    <Typography fontSize={16} fontFamily={fonts.poppinsMedium}>{job?.assigned_to?.name}</Typography>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#CCC" />
              </TouchableOpacity>
            )}

            {/* Logistics Info */}
            <SectionCard title="Job Details" icon="assignment">
              <DetailRow label="Service Type" value={job?.service_type} />
              <DetailRow 
                label="Urgency" 
                value={urgencyLevelText(job?.urgency ?? '')} 
                valueColor={job?.urgency === "High" ? '#E74C3C' : '#2ECC71'}
              />
              <DetailRow label="Schedule" value={formatToFull12HourDateTime(job?.preferred_date ?? '')} />
            </SectionCard>

            {/* Location Section */}
            <SectionCard title="Location Details" icon="location-on">
              <Typography fontSize={14} color="#333" style={{ marginBottom: 10 }}>{job?.address}</Typography>
              <View style={localStyles.locationGrid}>
                <View style={{ flex: 1 }}>
                  <Typography fontSize={12} color={colors.primaryTextLight}>City</Typography>
                  <Typography fontSize={14} fontFamily={fonts.poppinsMedium}>{job?.city}</Typography>
                </View>
                <View style={{ flex: 1 }}>
                  <Typography fontSize={12} color={colors.primaryTextLight}>Post Code</Typography>
                  <Typography fontSize={14} fontFamily={fonts.poppinsMedium}>{job?.post_code}</Typography>
                </View>
              </View>
            </SectionCard>

            {/* Instructions */}
            {job?.instructions && (
              <SectionCard title="Specific Instructions" icon="info-outline">
                <Typography fontSize={14} style={{ fontStyle: 'italic', color: '#666' }}>"{job?.instructions}"</Typography>
              </SectionCard>
            )}
          </>
        ) : !loading && !job ? (
          <NoResultsFound title={'Job not found.'} />
        ) : null}
      </ScrollView>

      {/* Action Buttons */}
      {/* <View style={localStyles.footer}> */}
        {jobMeta?.canCompleteJob && (
          <Button onPress={redirectToComplete} title={'Complete Job'} buttonStyle={styles.btnPrimary} />
        )}
        {job && jobMeta?.canEmployeeInteract && (
          <AcceptJobTicket ticket={jobTicket} />
        )}
        {jobMeta?.canReviewJob && (
          <Button onPress={redirectToReview} title={'Submit Review'} buttonStyle={styles.btnPrimary} />
        )}
      {/* </View> */}
    </>
  );
};

// --- Helper Components ---

const SectionCard = memo(({ title, children, icon }: any) => (
  <View style={localStyles.sectionCard}>
    <View style={localStyles.sectionHeaderRow}>
      <MaterialIcons name={icon} size={18} color={colors.btnPrimary} />
      <Typography fontSize={15} fontFamily={fonts.poppinsSemiBold} style={{ marginLeft: 8 }}>{title}</Typography>
    </View>
    <Divider style={{ marginVertical: 12 }} />
    {children}
  </View>
));

const DetailRow = ({ label, value, valueColor = '#000' }: any) => (
  <View style={localStyles.detailRow}>
    <Typography fontSize={13} color={colors.primaryTextLight}>{label}</Typography>
    <Typography fontSize={13} fontFamily={fonts.poppinsMedium} style={{ color: valueColor }}>{value}</Typography>
  </View>
);

const localStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  topSection: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 15 },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoCard: { backgroundColor: '#FFF', padding: 20, marginHorizontal: 20, borderRadius: 15, elevation: 1 },
  assignmentCard: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF', padding: 15, marginHorizontal: 20, marginTop: 15, borderRadius: 15,
    borderWidth: 1, borderColor: '#EFEFEF'
  },
  sectionCard: { backgroundColor: '#FFF', padding: 20, marginHorizontal: 20, marginTop: 15, borderRadius: 15 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  locationGrid: { flexDirection: 'row', marginTop: 10, padding: 10, backgroundColor: '#F9F9F9', borderRadius: 10 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  footer: { 
    position: 'absolute', bottom: 0, width: '100%', 
    backgroundColor: '#FFF', padding: 20, borderTopWidth: 1, borderTopColor: '#EEE' 
  }
});

// AcceptJobTicket logic remains the same but styles should be imported/integrated
const AcceptJobTicket = memo(({ ticket }: { ticket: any }) => {
  const { mutate: acceptJob, isPending: accepting } = useAcceptJobTicket(ticket?.job, ticket?.user);
  const { mutate: rejectJob, isPending: rejecting } = useRejectJobTicket(ticket?.job, ticket?.user);

  const handleAcceptJob = () => {
    acceptJob(ticket?._id, {
      onSuccess: () => showToast('Job ticket accepted successfully'),
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  const handleRejectTicket = () => {
    rejectJob(ticket?._id, {
      onSuccess: () => showToast('Job ticket rejected successfully'),
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  if (!ticket || ticket?.status !== 'assigned') return null;

  return (
    <View style={{ gap: 10 }}>
      <Button
        onPress={handleAcceptJob}
        loading={accepting}
        disabled={isTicketExpired(ticket?.createdAt) || accepting}
        title={isTicketExpired(ticket?.createdAt) ? 'Ticket Expired' : 'Accept Ticket'}
        buttonStyle={styles.btnPrimary}
      />
      <Button
        onPress={handleRejectTicket}
        loading={rejecting}
        title="Decline Ticket"
        buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E74C3C' }}
        titleStyle={{ color: '#E74C3C' }}
      />
    </View>
  );
});

export default JobDetail;