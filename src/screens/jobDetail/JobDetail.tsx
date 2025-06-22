import React, {memo, ReactNode, useEffect, useState} from 'react';
import {
  BackgroundImgContainer,
  Header,
  NoResultsFound,
  Typography,
} from '@components/index';
import fonts from '@config/Fonts';
import {RefreshControl, ScrollView, View} from 'react-native';
import colors from '@config/Colors';
import {Divider} from '@rneui/themed';
import {formatToFull12HourDateTime, getTimeAgo} from '@utils/DateFormat';
import {useGet} from '@hooks/useGet';
import endpoints from '@api/endpoints';
import {Job} from '../../types/job';
import {
  formatJobStatus,
  getStatusColor,
  urgencyLevelText,
} from '@config/Constants';

const JobDetail = ({route}: any) => {
  const {id} = route?.params;
  const [job, setJob] = useState<Job>();
  const {data, request, loading} = useGet({
    endpoint: `${endpoints.jobs}/${id}`,
    autoFetch: id,
  });

  useEffect(() => {
    if (data?.data) {
      setJob(data?.data);
    }
  }, [data]);

  return (
    <BackgroundImgContainer>
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
    </BackgroundImgContainer>
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

export default JobDetail;
