import { colors, fonts } from '@/config/index';
import { Image, View } from 'react-native';
import React, { memo } from 'react';

import { Typography } from './ui/Typography';


export const UserAvatar = memo(
  ({image = '', name = '', size = 45, fontSize = 20}: any) => {
    const title = name?.[0]?.toUpperCase() || '?';
    return (
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            borderRadius: 100,
            overflow: 'hidden',
            backgroundColor: colors.btnDisabled,
          }}>
          {image ? (
            <Image
              source={{uri: image}}
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
              alt=""
            />
          ) : (
            <Typography
              fontSize={fontSize}
              fontFamily={fonts.poppinsMedium}
              color={colors.white}>
              {title}
            </Typography>
          )}
        </View>
      </>
    );
  },
);
