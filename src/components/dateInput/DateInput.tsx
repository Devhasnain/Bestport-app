import { TouchableOpacity, Image, Text, View, Typography, isIOS, } from '@/components/index';
import { formatTo12HourTime, formatToDMY, formatToFull12HourDateTime, } from '@/utils/DateFormat';
import React, { memo, useCallback, useState } from 'react';
import { images, colors, fonts } from '@/config/index';
import { ViewStyle, TextStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';

import styles from './DateInput.style';


type Props = {
  value: string;
  mode: 'date' | 'time' | 'datetime' | undefined;
  handleChange?: any;
  additionlStyle?: ViewStyle;
  placeholder: string;
  error?: any;
};

// ─── UTC Conversion Helpers ───────────────────────────────────────────────────

/**
 * Date mode → "2026-05-15T00:00:00.000Z"
 * Time mode → "1970-01-01T10:30:00.000Z"  (neutral epoch date, only time matters)
 * Datetime mode → "2026-05-15T10:30:00.000Z"
 *
 * Key fix: we read year/month/day/hours/minutes from the LOCAL Date object
 * (which is what the user actually selected), then construct a UTC string
 * manually — so no timezone shift occurs.
 */
const toUTCSafeISOString = (date: Date, mode: 'date' | 'time' | 'datetime'): string => {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year  = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day   = pad(date.getDate());
  const hours = pad(date.getHours());
  const mins  = pad(date.getMinutes());

  if (mode === 'date') {
    // No time needed — always midnight UTC so date never shifts
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  if (mode === 'time') {
    // No date needed — use epoch base date, only HH:mm matters
    return `1970-01-01T${hours}:${mins}:00.000Z`;
  }

  // datetime — full UTC string with exact time user selected
  return `${year}-${month}-${day}T${hours}:${mins}:00.000Z`;
};

/**
 * Safely parse the stored value string back into a Date for the picker.
 * Falls back to current time if value is empty/invalid.
 */
const parsePickerDate = (value: string): Date => {
  if (!value) return new Date();

  const date = new Date(value);
  return isNaN(date.getTime()) ? new Date() : date;
};

// ─── Component ────────────────────────────────────────────────────────────────

export const DateInput = memo(
  ({
    value = '',
    mode = 'date',
    handleChange = () => {},
    additionlStyle,
    placeholder,
    error,
  }: Props) => {
    const [dateOpen, setDateOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);

    const dateOnChange = useCallback(
      (date: Date) => {
        setDateOpen(false);

        const utcString = toUTCSafeISOString(date, mode ?? 'date');

        if (mode === 'date') {
          handleChange({ date: utcString });
        } else if (mode === 'time') {
          handleChange({ time: utcString });
        } else {
          handleChange({ date: utcString });
        }
      },
      [handleChange, mode],
    );

    const displayValue = () => {
      if (!value) return placeholder;
      if (mode === 'date')     return formatToDMY(value);
      if (mode === 'time')     return formatTo12HourTime(value);
      if (mode === 'datetime') return formatToFull12HourDateTime(value);
      return value;
    };

    return (
      <View style={[styles.parentContainer, additionlStyle]}>
        <Typography
          fontFamily={fonts.poppinsRegular}
          color={colors.primaryTextLight}
          fontSize={13.5}
          style={{ fontWeight: '600' }}>
          {placeholder}
        </Typography>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setDateOpen(true)}
          onFocus={handleFocus}
          style={[
            container(error),
            error      ? { borderColor: 'red' }                                    : {},
            isFocused  ? { borderColor: colors.activeInputBorderColor, borderWidth: 2 } : {},
          ]}>

          <DatePicker
            open={dateOpen}
            modal
            mode={mode}
            date={parsePickerDate(value)}
            onConfirm={dateOnChange}
            onCancel={() => setDateOpen(false)}
          />

          <Text numberOfLines={1} style={text(value)}>
            {displayValue()}
          </Text>

          <Image source={images.angleDownImage} />
        </TouchableOpacity>

        {error && (
          <Typography color={colors.authLinkText} fontSize={12} lineHeight={18}>
            {error}
          </Typography>
        )}
      </View>
    );
  },
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const container = (error: any): ViewStyle => ({
  width: '100%',
  backgroundColor: colors.white,
  borderWidth: isIOS ? 1 : 1.5,
  borderRadius: 12,
  borderColor: error ? colors.activeInputBorderColor : colors.inputBorder,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 13,
  minHeight: 50,
});

const text = (value: any): TextStyle => ({
  fontFamily: fonts.poppinsRegular,
  color: value ? colors.primaryText : colors.inputplaceholder,
  fontSize: 14,
});