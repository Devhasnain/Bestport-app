import { Header, Input, Typography, View, Button, MaterialIcons, JobStatus, EmptyState, Pagination, AppFlatlist, } from '@/components/index';
import { getTimeAgo, helpRequestSchema, getErrorMessage, showAlert, showErrorAlert, } from '@/utils/index';
import { ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSupport, useCreateSupportRequest } from '@/hooks/index';
import { colors, fonts } from '@/config/index';
import React, { useState } from 'react';
import { Formik } from 'formik';


const initialValues = {subject: '', phone: '', message: ''};

const CustomerSupport = () => {
  const [page, setPage] = useState(1);
  const {mutate: createRequest, isPending: isCreating} =
    useCreateSupportRequest();
  const {
    data: supportRes,
    isPending: isFetching,
    refetch: refetchRequests,
  } = useSupport({page, limit: 10});

  const requests = supportRes?.data?.requests || [];

  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'

  const onSubmitRequest = (values: any, {resetForm}: any) => {
    createRequest(values, {
      onSuccess: () => {
        showAlert('success', 'Support request submitted successfully');
        resetForm();
      },
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  const RequestItem = ({item}: any) => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.requestCard}>
        {item?.ticketId && (
          <View style={styles.cardHeader}>
            <Typography fontSize={13} color={colors.primaryTextLight}>
              {item?.ticketId}
            </Typography>
            <JobStatus status={item?.status || 'Unknown'} />
          </View>
        )}
        <Typography
          fontSize={16}
          fontFamily={fonts.poppinsSemiBold}
          style={{marginTop: 4}}>
          {item?.subject}
        </Typography>
        <View style={styles.cardFooter}>
          <MaterialIcons
            name="event"
            size={14}
            color={colors.primaryTextLight}
          />
          <Typography
            fontSize={12}
            color={colors.primaryTextLight}
            style={{marginLeft: 4}}>
            {getTimeAgo(item?.createdAt)}
          </Typography>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header leftIcon title="Customer Support" />

      {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tab, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}>
          <Typography
            color={activeTab === 'new' ? colors.btnPrimary : '#888'}
            fontFamily={fonts.poppinsMedium}>
            New Request
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}>
          <Typography
            color={activeTab === 'history' ? colors.btnPrimary : '#888'}
            fontFamily={fonts.poppinsMedium}>
            History
          </Typography>
        </TouchableOpacity>
      </View>

      {activeTab === 'new' ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.introBox}>
            <Typography fontFamily={fonts.poppinsSemiBold} fontSize={20}>
              How can we help?
            </Typography>
            <Typography
              color={colors.primaryTextLight}
              fontSize={14}
              style={{marginTop: 5}}>
              Fill out the form below and our team will get back to you within
              24 hours.
            </Typography>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={helpRequestSchema}
            onSubmit={onSubmitRequest}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <View style={styles.formContainer}>
                <Input
                  label="Subject"
                  placeholder="e.g. Account Access"
                  value={values.subject}
                  onChange={handleChange('subject')}
                  error={touched?.subject && errors?.subject}
                />
                <Input
                  label="Phone Number"
                  placeholder="e.g. +92 300 1234567"
                  keyboardType="phone-pad"
                  inputMode="numeric"
                  inputType="number"
                  value={values.phone}
                  onChange={handleChange('phone')}
                  error={touched?.phone && errors?.phone}
                />
                <Input
                  label="Description"
                  placeholder="Tell us more about your issue..."
                  value={values.message}
                  onChange={handleChange('message')}
                  error={touched?.message && errors?.message}
                  multiline
                  numberOfLines={6}
                  inputStyle={{verticalAlign: 'top', fontSize: 15}}
                />
                <Button
                  disabledStyle={{backgroundColor: colors.btnDisabled}}
                  disabledTitleStyle={{backgroundColor: colors.btnDisabled}}
                  loading={isCreating}
                  disabled={isCreating}
                  onPress={() => handleSubmit()}
                  buttonStyle={styles.submitBtn}>
                  <Typography color={colors.white}>Submit Request</Typography>
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      ) : (
        <AppFlatlist
          onRefresh={refetchRequests}
          refreshing={isFetching}
          data={requests}
          renderItem={({item}: {item: any} ) => <RequestItem item={item} />}
          keyExtractor={(item:any) => item?._id || ''}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState />}
          ListFooterComponent={
            <Pagination
              totalPages={supportRes?.data?.pagination?.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.white50,
  },
  tab: {flex: 1, paddingVertical: 15, alignItems: 'center'},
  activeTab: {borderBottomWidth: 3, borderBottomColor: colors.btnPrimary},
  scrollContent: {padding: 20},
  introBox: {marginBottom: 25},
  formContainer: {gap: 15},
  submitBtn: {
    height: 55,
    borderRadius: 15,
    backgroundColor: colors.btnPrimary,
    marginTop: 10,
  },
  listContent: {padding: 20},
  requestCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8},
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 10,
  },
});

export default CustomerSupport;
