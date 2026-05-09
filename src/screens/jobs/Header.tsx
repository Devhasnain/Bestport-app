import { View, Header as RNHeader, Feather, AppBottomSheet, } from '@/components/index';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { JobStatus } from '@/types/index';
import React, { useState } from 'react';
import colors from '@/config/Colors';


const JobStatusFilters = ['all', 'pending', 'in-progress', 'completed'];

const Header = ({
  activeTab,
  onChangeFilter,
}: {
  activeTab: 'tickets' | 'jobs';
  onChangeFilter: (e: JobStatus) => void;
}) => {
  const user = useAuthStore(state => state.user);
  const [open, setOpen] = useState(false);

  const [filter, setFilter] = useState<JobStatus>('all');

  const toggleFilter = (e: JobStatus) => {
    if (e === filter) {
      setFilter(null);
      onChangeFilter(null);
    } else {
      setFilter(e);
      onChangeFilter(e);
    }
  };

  const formatLabel = (key: string) => {
    return (
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
    );
  };

  return (
    <>
      <RNHeader title="Jobs">
        {user?.role === "employee" && activeTab === 'jobs' && (
          <TouchableOpacity onPress={() => setOpen(!open)} activeOpacity={0.7}>
            <Feather name="align-center" size={24} color={colors.secondary} />
          </TouchableOpacity>
        )}
        {user?.role === "customer" && (
          <TouchableOpacity onPress={() => setOpen(!open)} activeOpacity={0.7}>
            <Feather name="align-center" size={24} color={colors.secondary} />
          </TouchableOpacity>
        )}
      </RNHeader>
      <AppBottomSheet open={open} onClose={() => setOpen(!open)}>
        <Text style={styles.title}>Filter Jobs</Text>

        <View style={styles.gridContainer}>
          {JobStatusFilters.map((key: any) => {
            const isActive = key === filter;

            return (
              <TouchableOpacity
                key={key}
                onPress={() => toggleFilter(key)}
                activeOpacity={0.8}
                style={[
                  styles.filterButton,
                  isActive ? styles.activeButton : styles.inactiveButton,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    isActive ? styles.activeText : styles.inactiveText,
                  ]}>
                  {formatLabel(key)}
                </Text>
              </TouchableOpacity>
            );
          })}
          {user?.role === 'customer' && (
            <TouchableOpacity
              onPress={() => toggleFilter('cancelled')}
              activeOpacity={0.8}
              style={[
                styles.filterButton,
                filter === 'cancelled'
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  filter === 'cancelled'
                    ? styles.activeText
                    : styles.inactiveText,
                ]}>
                {formatLabel('cancelled')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </AppBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: '48%', // Takay ek row mein 2 buttons thodi space ke sath aa sakein
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15, // Neeche wale buttons se distance
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0', // Gray border
  },
  activeButton: {
    backgroundColor: '#fff',
    borderColor: colors.btnPrimary || '#007AFF', // btnPrimary color
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveText: {
    color: '#888', // Unactive text color
  },
  activeText: {
    color: colors.primary || '#007AFF', // Primary color text
  },
});

export default Header;
