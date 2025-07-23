import { AppFlatlist, Header, Typography } from '@components/index';
import { privacyPolicy } from '@config/Constants';
import { View } from 'react-native';
import fonts from '@config/Fonts';
import React from 'react';


const PrivacyPolicy = () => {
  return (
    <>
        <Header leftIcon title='Pivacy policy' />

        <AppFlatlist
        paddingBottom={20}
        data={privacyPolicy}
        contentContainerStyle={{paddingHorizontal:14,paddingVertical:10, gap:16}}
        renderItem={({item}:any)=>(
          <View
          style={{display:"flex",flexDirection:"column",gap:5}}
          >
            <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>{item?.title}</Typography>
            <Typography fontSize={14} >{item?.content}</Typography>
          </View>
        )}
        />
    </>
  )
}

export default PrivacyPolicy