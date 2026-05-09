import { View, ViewStyle } from 'react-native';
import { memo } from 'react';

import { Typography } from './ui/Typography';


type Props = {
  title?: string;
  additionalStyles?: ViewStyle;
  fontSize?: number;
  lineHeight?: number;
};

export const NoResultsFound = memo(({
  title,
  additionalStyles,
  fontSize = 16,
  lineHeight = fontSize * 1.4,
}: Props) => {
  return (
    <View
      style={[
        {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '10%',
        },
        additionalStyles,
      ]}>
      <Typography fontSize={fontSize} lineHeight={lineHeight}>
        {title}
      </Typography>
    </View>
  );
});