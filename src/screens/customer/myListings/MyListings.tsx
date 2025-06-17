import React from 'react';
import {BackgroundImgContainer, TabBar} from '@components/index';
import Pending from './Pending';
import Assigned from './Assigned';
import InProgress from './InProgress';
import Completed from './Completed';
import Canceled from './Canceled';
import {Image, View} from 'react-native';
import images from '@config/Images';
import {Button} from '@rneui/themed';
import colors from '@config/Colors';
import fonts from '@config/Fonts';
import { navigate } from '@navigation/NavigationService';

const tabs = [
  {
    title: 'Pending',
    component: <Pending />,
  },
  {
    title: 'Assigned',
    component: <Assigned />,
  },
  {
    title: 'In progress',
    component: <InProgress />,
  },
  {
    title: 'Completed',
    component: <Completed />,
  },
  {
    title: 'Canceled',
    component: <Canceled />,
  },
];

const MyListings = () => {
  return (
    <BackgroundImgContainer px={0}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal:12,
          paddingTop:8,
          paddingBottom:16
        }}>
        <Image source={images.appIcon} style={{width: 60, height: 60}} />

        <Button
        onPress={()=>navigate("CreateJob")}
          title={'Create Job'}
          containerStyle={{borderRadius: 10}}
          buttonStyle={{
            backgroundColor: colors.btnPrimary,
            paddingHorizontal: 12,
          }}
          titleStyle={{
            fontSize: 13,
            fontFamily: fonts.poppinsMedium,
            lineHeight: 20,
          }}
        />
      </View>
      <TabBar tabs={tabs} />
    </BackgroundImgContainer>
  );
};

export default MyListings;
