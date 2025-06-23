import React, {memo} from 'react';
import Typography from '../Typography';
import colors from '@config/Colors';

const InputErrorMessage = ({error = ''}) => {
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
};

export default memo(InputErrorMessage);
