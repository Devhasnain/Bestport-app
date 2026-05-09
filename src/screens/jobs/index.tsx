import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { JobStatus } from '@/types/job.types';
import React, { useState } from 'react';
import colors from '@/config/Colors';

import TicketsList from './TicketsList';
import JobsList from './JobsList';
import Header from './Header';


type TabType = 'tickets' | 'jobs';

const Jobs: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const [jobStatus, setJobStatus] = useState<JobStatus>(null);
  const [activeTab, setActiveTab] = useState<TabType>('tickets');

  return (
    <>
      <Header activeTab={activeTab} onChangeFilter={setJobStatus} />

      {/* Tabs Container */}
      {user?.role === 'employee' && (
        <>
          <View style={styles.tabWrapper}>
            <View style={styles.tabBar}>
              {/* Active Jobs Tab */}
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'tickets'
                    ? styles.activeTab
                    : styles.inactiveTab,
                ]}
                onPress={() => setActiveTab('tickets')}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'tickets'
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}>
                  Tickets
                </Text>
              </TouchableOpacity>

              {/* History Tab */}
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'jobs' ? styles.activeTab : styles.inactiveTab,
                ]}
                onPress={() => setActiveTab('jobs')}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'jobs'
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}>
                  Jobs
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {activeTab === 'tickets' ? (
            <TicketsList />
          ) : (
            <JobsList status={jobStatus} />
          )}
        </>
      )}
      {user?.role === 'customer' && <JobsList status={jobStatus} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabWrapper: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5', // Light gray background for the bar
    borderRadius: 10,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.btnPrimary || '#007AFF', // Active tab background
    // Elevation/Shadow for active tab (Optional)
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inactiveTab: {
    backgroundColor: colors.white50 || 'rgba(255, 255, 255, 0.5)', // Inactive tab background
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff', // Active text white
  },
  inactiveText: {
    color: '#888', // Inactive text gray
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
});

export default Jobs;
