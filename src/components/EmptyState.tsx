import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, Typography } from '@/components/index'; // Aapke components
import { colors, fonts } from '@/config/index';
import React from 'react';


const { height } = Dimensions.get('window');

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onPress?: () => void;
}

export const EmptyState = ({
  icon = "event-note",
  title = "No Data Found",
  description = "It looks like there's nothing to show here at the moment.",
  buttonText,
  onPress
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.iconCircle}>
        <MaterialIcons name={icon} size={60} color={colors.btnPrimary} />
      </View>

      {/* Text Section */}
      <Typography 
        fontSize={20} 
        fontFamily={fonts.poppinsSemiBold} 
        style={styles.title}
      >
        {title}
      </Typography>

      <Typography 
        fontSize={14} 
        color={colors.primaryTextLight} 
        style={styles.description}
      >
        {description}
      </Typography>

      {/* Optional Action Button */}
      {buttonText && onPress && (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Typography color={colors.white} fontFamily={fonts.poppinsMedium}>
            {buttonText}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 60
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F4FF', // Light primary color background
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  button: {
    backgroundColor: colors.btnPrimary,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: colors.btnPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});