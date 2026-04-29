import { FontAwesome, Header, TextAccordion, Typography, UserAvatar, View, ScrollView, RefreshControl } from '@components/index';
import React, { memo, useEffect, useState } from 'react';
import styles from "@styles/employeProfile.styles";
import { formatToDMY } from '@utils/DateFormat';
import { colors, fonts } from '@config/index';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';


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
        contentContainerStyle={styles.contentContainerStyle}>
        {!getEmployeeProfileApi.loading && employeeProfile ? (
          <>
            <View
              style={styles.headerAvatarContainer}>
              <UserAvatar
                image={employeeProfile?.profile_img?.path}
                name={employeeProfile?.name}
                size={100}
                fontSize={28}
              />

              <View
                style={styles.headerNameContainer}>
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
                style={styles.ratingsContainer}>
                <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                  Overall rating
                </Typography>
                <View
                  style={styles.ratingStarsWrapper}>
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

            {employeeProfile?.reviews?.map((item: any, index: number) => (
              <SectionCard key={index}>
                <View
                  style={styles.reviewCardContainer}>
                  <View
                    style={styles.reviewCardAvatarContainer}>
                    <UserAvatar
                      size={40}
                      image={item?.customer?.profile_img}
                      name={item?.customer?.name}
                    />
                    <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
                      {item?.customer?.name}
                    </Typography>
                  </View>
                  <View
                  style={styles.reviewCardStarsContainer}>
                  <FontAwesome
                    size={18}
                    name="star"
                    color={colors.ratingStarColor}
                  />
                  <Typography color={colors.primaryTextLight} fontSize={15}>
                    ({item?.rating ?? 0})
                  </Typography>
                </View>
                </View>
                <TextAccordion 
                text={item?.comment}
                charLimit={100}
                />
              </SectionCard>
            ))}
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
    style={styles.sectionContainer}>
    {children}
  </View>
));

export default EmployeeProfile;
