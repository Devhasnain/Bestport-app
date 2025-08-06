import { FontAwesome, Header, TextAccordion, Typography, } from '@components/index';
import { View, ScrollView, RefreshControl } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import UserAvatar from '@components/UserAvatar';
import { formatToDMY } from '@utils/DateFormat';
import { ScreenWidth } from '@rneui/base';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


const EmployeeProfile = ({route}: any) => {
  const params = route?.params;
  const [employeeProfile, setEmployeeProfile] = useState<any>(null);
  const getEmployeeProfileApi = useGet({
    endpoint: endpoints.getEmployeeProfile(params?.id),
    autoFetch: params?.id && !employeeProfile,
  });

  useEffect(() => {
    if (getEmployeeProfileApi.data) {
      setEmployeeProfile(getEmployeeProfileApi.data.data ?? null);
    }
  }, [getEmployeeProfileApi.data]);

  return (
    <>
      <Header leftIcon />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={getEmployeeProfileApi.loading}
            onRefresh={getEmployeeProfileApi.request}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={{paddingTop: 30, gap: 25}}>
        {!getEmployeeProfileApi.loading && employeeProfile ? (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}>
              <UserAvatar
                image={employeeProfile?.profile_img}
                name={employeeProfile?.name}
                size={100}
                fontSize={28}
              />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}>
                <Typography fontSize={20} fontFamily={fonts.poppinsSemiBold}>
                  {employeeProfile?.name}
                </Typography>

                {employeeProfile?.position && (
                  <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                    {employeeProfile?.position}
                  </Typography>
                )}
              </View>
            </View>

            <SectionCard>
              <View>
                <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                  About
                </Typography>
                <TextAccordion
                  text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores neque eligendi corrupti eum dicta autem placeat rerum quasi perferendis dolorem, reiciendis non quas voluptatem aspernatur beatae voluptate, libero earum nam.`}
                  charLimit={150}
                />
              </View>

              <View>
                <Typography fontFamily={fonts.poppinsMedium} fontSize={13}>
                  Member since
                </Typography>
                <Typography color={colors.primaryTextLight} fontSize={14}>
                  {formatToDMY(employeeProfile?.createdAt)}
                </Typography>
              </View>

              {employeeProfile?.date_of_birth && (
                <View>
                  <Typography fontFamily={fonts.poppinsMedium} fontSize={13}>
                    Date of birth
                  </Typography>
                  <Typography color={colors.primaryTextLight} fontSize={14}>
                    {formatToDMY(employeeProfile?.date_of_birth)}
                  </Typography>
                </View>
              )}
            </SectionCard>

            <SectionCard>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                  Overall rating
                </Typography>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <FontAwesome
                    size={18}
                    name="star"
                    color={colors.ratingStarColor}
                  />
                  <Typography color={colors.primaryTextLight} fontSize={15}>
                    ({employeeProfile?.rating ?? 0})
                  </Typography>
                </View>
              </View>
            </SectionCard>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </>
  );
};

const SectionCard = memo(({children}: any) => (
  <View
    style={{
      padding: 14,
      backgroundColor: colors.white,
      elevation: 8,
      width: ScreenWidth - 28,
      marginHorizontal: 'auto',
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
    {children}
  </View>
));

export default EmployeeProfile;
