import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, setJobs } from '@store/jobSlice';
import { TabBar } from '@components/index';
import { Image, View } from 'react-native';
import React, { useEffect } from 'react';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';
import { Button } from '@rneui/themed';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import InProgress from './InProgress';
import Completed from './Completed';
import Canceled from './Canceled';
import Pending from './Pending';


const Home = React.memo(() => {
  const dispatch = useDispatch();
  const jobs = useSelector(getJobs);
  const {data, loading, request} = useGet({
    endpoint: endpoints.jobs,
    autoFetch: !jobs?.length,
  });

  const tabs = [
    {
      title: 'Pending',
      component: <Pending onRefresh={request} refreshing={loading} />,
    },
    {
      title: 'In progress',
      component: <InProgress onRefresh={request} refreshing={loading} />,
    },
    {
      title: 'Completed',
      component: <Completed onRefresh={request} refreshing={loading} />,
    },
    {
      title: 'Canceled',
      component: <Canceled onRefresh={request} refreshing={loading} />,
    },
  ];

  useEffect(() => {
    if (data?.data) {
      dispatch(setJobs(data?.data));
    }
  }, [data]);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingTop: 50,
          paddingBottom: 16,
        }}>
        <View
          style={{
            height: 40,
            width: 110,
          }}>
          <Image
            source={images.appLogoName}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>

        <Button
          onPress={() => navigate('CreateJob')}
          title={'Create Job'}
          containerStyle={{borderRadius: 10}}
          buttonStyle={{
            backgroundColor: colors.btnPrimary,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
          titleStyle={{
            fontSize: 12,
            fontFamily: fonts.poppinsMedium,
            lineHeight: 20,
          }}
        />
      </View>
      <TabBar tabs={tabs} />
    </>
  );
});

export default Home;
