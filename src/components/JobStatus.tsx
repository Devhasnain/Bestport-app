import { StyleSheet, Text, View } from 'react-native';


const STATUS_CONFIG: Record<
  string,
  {label: string; bg: string; text: string; border: string}
> = {
  pending: {
    label: 'Pending',
    bg: '#FAEEDA',
    text: '#854F0B',
    border: '#FAC775',
  },
  assigned: {
    label: 'Assigned',
    bg: '#E6F1FB',
    text: '#185FA5',
    border: '#85B7EB',
  },
  'in-progress': {
    label: 'In Progress',
    bg: '#EEEDFE',
    text: '#534AB7',
    border: '#AFA9EC',
  },
  completed: {
    label: 'Completed',
    bg: '#EAF3DE',
    text: '#3B6D11',
    border: '#97C459',
  },
  cancelled: {
    label: 'Cancelled',
    bg: '#FCEBEB',
    text: '#A32D2D',
    border: '#F09595',
  },
};

export const JobStatus = ({status}: {status: string}) => {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <View
      style={[
        styles.statusBadge,
        {backgroundColor: config?.bg, borderColor: config?.border},
      ]}>
      <Text style={[styles.statusText, {color: config?.text}]}>
        {config?.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 0.8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
});
