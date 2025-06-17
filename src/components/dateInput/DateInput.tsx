import {formatTo12HourTime, formatToDMY} from '@utils/DateFormat';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import DatePicker from 'react-native-date-picker';

import styles from './DateInput.style';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import images from '@config/Images';
import Typography from '@components/ui/Typography';

type Props = {
  value: string;
  mode: 'date' | 'time' | 'datetime' | undefined;
  handleChange?: any;
  additionlStyle?: ViewStyle;
  placeholder: string;
  error?: string;
};

const DateInput = ({
  value = '',
  mode = 'date',
  handleChange = () => {},
  additionlStyle,
  placeholder,
  error,
}: Props) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const dateOnChange = useCallback(
    (date: any) => {
      if (mode === 'date') {
        handleChange({date: timeStampToISOString(date)});
        setDateOpen(!dateOpen);
      } else if (mode === 'time') {
        handleChange({time: timeStampToISOString(date)});
        setDateOpen(!dateOpen);
      } else {
        handleChange({date: timeStampToISOString(date)});
        setDateOpen(!dateOpen);
      }
    },
    [dateOpen, handleChange, timeOpen],
  );

  return (
    <View style={[styles.parentContainer, additionlStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setDateOpen(!dateOpen)}
        onFocus={handleFocus}
        style={[
          container(error),
          error ? {borderColor: 'red'} : {},
          isFocused
            ? {borderColor: colors.activeInputBorderColor, borderWidth: 2}
            : {},
        ]}>
        <DatePicker
          open={dateOpen}
          modal
          mode={mode}
          date={new Date(value ? value : new Date().toISOString())}
          onConfirm={dateOnChange}
          onCancel={() => {
            setDateOpen(false);
          }}
        />

        <Text numberOfLines={1} style={[text(value)]}>
          {value
            ? mode === 'date'
              ? formatToDMY(value)
              : mode === 'time'
              ? formatTo12HourTime(value)
              : mode === 'datetime'
              ? formatTo12HourTime(value)
              : value
            : placeholder}
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
};

const timeStampToISOString = (timestamp: string) => {
  try {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date?.toISOString();
  } catch (error) {
    return 'error';
  }
};

const container = (error: any): ViewStyle => ({
  width: '100%',
  backgroundColor: colors.white,
  borderWidth: 1.5,
  borderRadius: 12,
  borderColor: error ? colors.activeInputBorderColor : colors.inputBorder,
  display: 'flex',
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

export default memo(DateInput);
