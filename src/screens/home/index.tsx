import UserGreeting from '@components/userGreeting/UserGreeting';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, setJobs } from '@store/jobSlice';
import React, { useEffect, useMemo } from 'react';
import { TabBar } from '@components/index';
import { Image, View } from 'react-native';
import { getUser } from '@store/authSlice';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';
import { Button } from '@rneui/themed';
import images from '@config/Images';
import colors from '@config/Colors';
import { isIOS } from '@rneui/base';
import fonts from '@config/Fonts';

import InProgress from './InProgress';
import Completed from './Completed';
import Canceled from './Canceled';
import Assigned from './Assigned';
import Pending from './Pending';


const Home = () => {
  const user = useSelector(getUser);
  const isCustomer = user?.role === 'customer';
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
      title: 'Assigned',
      component: <Assigned onRefresh={request} refreshing={loading} />,
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

  const userTabs = useMemo(() => {
    if (isCustomer) return tabs;
    if (user?.role === 'employee') return tabs.slice(1, tabs.length);
  }, [user]);

  useEffect(() => {
    if (data?.data) {
      dispatch(setJobs(data?.data));
    }
  }, [data]);

  return (
    <>
      {isCustomer && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingTop: isIOS ? 50 : 45,
            paddingBottom: 16,
          }}>
          <Image source={images.appIcon} style={{width: 50, height: 50}} />

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
      )}
      {user?.role === 'employee' && <UserGreeting />}
      <TabBar tabs={userTabs ?? []} />
    </>
  );
};

export default Home;
