import { Image, View } from 'react-native';
import React, { memo } from 'react';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import Typography from './ui/Typography';


const UserAvatar = ({image='', name='', size = 45, fontSize = 20}) => {
  const title = name?.[0]?.toUpperCase() || '?';
  return (
    <>
    <View
    style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      width:size,
      height:size,
      borderRadius:100,
      backgroundColor:colors.btnDisabled
    }}
    >
      {
        image ? 
        <Image
        source={{uri:image}}
        style={{height:"100%",width:"100%"}}
        resizeMode="cover"
        alt=''
        /> : 
        <Typography fontSize={fontSize} fontFamily={fonts.poppinsMedium} color={colors.white}>{title}</Typography>
      }
    </View>
    </>

  );
};

export default memo(UserAvatar);