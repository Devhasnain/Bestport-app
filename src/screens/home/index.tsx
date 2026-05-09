import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'; // RefreshControl add kiya
import { CustomerHeader, EmptyState, JobStatus, Typography, UserGreeting } from '@/components/index';
import { navigate } from '@/navigation/NavigationService';
import { useAnalytics, useJobs } from '@/hooks/queries';
import { useAuthStore } from '@/store/authStore';
import { getTimeAgo } from '@/utils/DateFormat';
import React, { useCallback } from 'react';
import colors from '@/config/Colors';


const Home = () => {
  const user = useAuthStore(state => state.user);
  
  const { 
    data: jobsRes, 
    refetch: refetchJobs, 
    isFetching: isFetchingJobs 
  } = useJobs({ page: 1, limit: 5, status: 'all' });

  const { 
    data: analyticsRes, 
    refetch: refetchAnalytics, 
    isFetching: isFetchingAnalytics 
  } = useAnalytics();

  const analyticsData = analyticsRes?.data;

  // Refresh handle karne ka function
  const onRefresh = useCallback(async () => {
    // Donu APIs ko parallel mein call kiya
    await Promise.all([refetchJobs(), refetchAnalytics()]);
  }, [refetchJobs, refetchAnalytics]);

  // Combined loading state for refresh indicator
  const refreshing = isFetchingJobs || isFetchingAnalytics;

  // Stats mapping (vahi purana logic)
  const stats = user?.role === 'customer'
    ? [
        { id: '1', label: 'Pending', count: analyticsData?.pending ?? 0, color: '#FFC107' },
        { id: '2', label: 'In Progress', count: analyticsData?.inProgress ?? 0, color: '#2196F3' },
        { id: '3', label: 'Completed', count: analyticsData?.completed ?? 0, color: '#4CAF50' },
        { id: '4', label: 'Cancelled', count: analyticsData?.cancelled ?? 0, color: '#F44336' },
      ]
    : [
        { id: '1', label: 'Assigned', count: analyticsData?.assigned ?? 0, color: '#673AB7' },
        { id: '2', label: 'In Progress', count: analyticsData?.inProgress ?? 0, color: '#2196F3' },
        { id: '3', label: 'Completed', count: analyticsData?.completed ?? 0, color: '#4CAF50' },
      ];

  const redirectToJobs = () => navigate('Jobs');

  const StatCard = ({ item }: any) => (
    <View style={[styles.card, { borderLeftColor: item.color, borderLeftWidth: 5 }]}>
      <Text style={styles.statCount}>{item.count}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );

  const JobItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate('JobDetail', { id: item?._id })}
      style={styles.jobItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.jobTitle} numberOfLines={1}>{item?.title}</Text>
        <Text style={styles.jobDate}>{getTimeAgo(item.createdAt)}</Text>
      </View>
      <JobStatus status={item?.status} />
    </TouchableOpacity>
  );

  return (
    <>
      {user?.role === 'customer' && <CustomerHeader />}
      {user?.role === 'employee' && <UserGreeting />}

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        // RefreshControl yahan add kiya gaya hai
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[colors.primary]} // Android loader color
            tintColor={colors.primary} // iOS loader color
          />
        }
      >
        <View style={styles.sectionHeader}>
          <Typography fontSize={22} style={styles.greeting}>Overview</Typography>
        </View>

        <View style={styles.grid}>
          {stats.map(item => (
            <StatCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {user?.role === 'customer' ? 'Your Recent Submissions' : 'Recent Assigned Tasks'}
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={redirectToJobs}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={jobsRes?.data?.jobs || []}
          renderItem={({ item }) => <JobItem item={item} />}
          keyExtractor={item => item?._id || Math.random().toString()}
          scrollEnabled={false}
          ListEmptyComponent={
            <EmptyState
              title="No Recent Activity"
              description="New jobs will appear here once created."
            />
          }
        />

        <View style={{ height: 30 }} />
      </ScrollView>
    </>
  );
};

// Styles same rahenge...

const styles = StyleSheet.create({
  container: {gap: 12, paddingHorizontal: 12},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  greeting: {fontWeight: 'bold'},
  sectionTitle: {fontSize: 18, fontWeight: '600', color: '#444'},
  seeAll: {color: colors.primary, fontWeight: 'semibold'}, // Fiverr Green Color
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    width: '48%', // 2 columns ke liye
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  statCount: {fontSize: 20, fontWeight: 'bold', color: '#222'},
  statLabel: {fontSize: 14, color: '#777', marginTop: 5},
  jobItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  jobTitle: {fontSize: 16, fontWeight: '500', color: '#333'},
  jobDate: {fontSize: 12, color: '#999', marginTop: 3},
  statusBadge: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15},
  statusText: {fontSize: 12, fontWeight: '600'},
});

export default Home;
