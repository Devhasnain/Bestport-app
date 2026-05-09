import colors from '@/config/Colors';
import React, { memo } from 'react';

import { Typography } from '../Typography';


export const InputErrorMessage = memo(({error = ''}:any) => {
  return (
    <Typography
      fontSize={12}
      lineHeight={18}
      color={colors.authLinkText}
      style={{
        paddingTop: 3,
      }}>
      {error}
    </Typography>
  );
});