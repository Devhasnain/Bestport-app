import { FontAwesome, Header, TextAccordion, Typography, UserAvatar, View, ScrollView, RefreshControl } from '@/components/index';
import { formatToDMY } from '@/utils/DateFormat';
import { colors, fonts } from '@/config/index';
import { useEmployee } from '@/hooks/index';
import { StyleSheet } from 'react-native';
import React, { memo } from 'react';


const EmployeeProfile = ({route}: any) => {
  const {
    data: apiResponse,
    refetch,
    isPending,
  } = useEmployee(route?.params?.id);
  const employee = apiResponse?.data;

  if (!employee) return null; // Loading state handled by your hook ideally

  return (
    <>
      <Header leftIcon title="Employee Profile" />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={refetch}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Profile Header Section */}
        <View style={styles.headerCard}>
          <UserAvatar
            image={employee?.profile_img?.path}
            name={employee?.name}
            size={110}
            fontSize={32}
          />
          <Typography
            fontSize={22}
            fontFamily={fonts.poppinsSemiBold}
            style={{marginTop: 12}}>
            {employee?.name}
          </Typography>
          <Typography
            fontSize={14}
            fontFamily={fonts.poppinsMedium}
            color={colors.primaryTextLight}>
            {employee?.position || 'Professional Worker'}
          </Typography>

          {/* Quick Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <FontAwesome
                name="star"
                size={16}
                color={colors.ratingStarColor}
              />
              <Typography
                fontSize={15}
                fontFamily={fonts.poppinsBold}
                style={{marginLeft: 5}}>
                {Number(employee?.rating || 0).toFixed(1) || '0.0'}
              </Typography>
              <Typography fontSize={11} color={colors.primaryTextLight}>
                {' '}
                Rating
              </Typography>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Typography fontSize={15} fontFamily={fonts.poppinsBold}>
                {employee?.reviews?.length || 0}
              </Typography>
              <Typography fontSize={11} color={colors.primaryTextLight}>
                {' '}
                Reviews
              </Typography>
            </View>
          </View>
        </View>

        {/* About Section */}
        <SectionCard title="About">
          <TextAccordion
            text={employee?.about || 'No description provided.'}
            charLimit={150}
          />
          <View style={styles.memberSinceContainer}>
            <Typography fontSize={12} color={colors.primaryTextLight}>
              Member since: {formatToDMY(employee?.createdAt)}
            </Typography>
          </View>
        </SectionCard>

        {/* Reviews Section */}
        <Typography
          fontSize={18}
          fontFamily={fonts.poppinsSemiBold}
          style={styles.sectionTitle}>
          Customer Reviews
        </Typography>

        {employee?.reviews?.map((item: any, index: number) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <UserAvatar
                size={35}
                image={item?.customer?.profile_img}
                name={item?.customer?.name}
              />
              <View style={{marginLeft: 10, flex: 1}}>
                <Typography fontSize={14} fontFamily={fonts.poppinsSemiBold}>
                  {item?.customer?.name}
                </Typography>
                <Typography fontSize={10} color={colors.primaryTextLight}>
                  {formatToDMY(item?.createdAt)}
                </Typography>
              </View>
              <View style={styles.miniRating}>
                <FontAwesome
                  name="star"
                  size={12}
                  color={colors.ratingStarColor}
                />
                <Typography fontSize={13} style={{marginLeft: 4}}>
                  {item.rating}
                </Typography>
              </View>
            </View>
            <Typography fontSize={13} color="#555" style={{marginTop: 8}}>
              {item?.comment}
            </Typography>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

// Section Card Component
const SectionCard = memo(({children, title}: any) => (
  <View style={styles.sectionContainer}>
    {title && (
      <Typography
        fontSize={16}
        fontFamily={fonts.poppinsSemiBold}
        style={{marginBottom: 10}}>
        {title}
      </Typography>
    )}
    {children}
  </View>
));

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 30,
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDD',
  },
  sectionContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
  },
  sectionTitle: {
    marginHorizontal: 25,
    marginTop: 25,
    marginBottom: 10,
  },
  memberSinceContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  reviewCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default EmployeeProfile;
