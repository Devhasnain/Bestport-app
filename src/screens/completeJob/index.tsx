import { AppFlatlist, Feather, FontAwesome, Header, SearchBar, Typography, } from '@components/index';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getProducts, setProducts } from '@store/productsSlice';
import { navigate } from '@navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenWidth } from '@rneui/base';
import endpoints from '@api/endpoints';
import { useGet } from '@hooks/useGet';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


const CompleteJob = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const getProductsApi = useGet({
    endpoint: endpoints.getProducts,
    autoFetch: !products?.length,
  });
  const [selectedProducts, setSelectedProducts] = useState<any[] | []>([]);

  const isSelected = useCallback(
    (id: string) => {
      return selectedProducts?.find(item => item?._id === id);
    },
    [selectedProducts],
  );

  const productDetails = useCallback((id: string) => {
    navigate('Product', {id});
  }, []);

  const renderItem = useCallback(
    ({item}: any) => (
      <View
        style={{
          width: ScreenWidth - 23,
          borderWidth: 0.3,
          borderColor: colors.inputplaceholder,
          borderRadius: 12,
          marginHorizontal: 'auto',
          padding: 12,
          backgroundColor: colors.white,
          position: 'relative',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 14,
          }}>
          <TouchableOpacity
            onPress={() => productDetails(item?._id)}
            activeOpacity={0.8}
            style={{
              width: '20%',
              aspectRatio: 1,
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 0.4,
              borderColor: colors.inputplaceholder,
            }}>
            <Image
              alt=""
              source={{uri: item?.image?.path}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              width: '70%',
            }}>
            <Typography
              fontFamily={fonts.poppinsSemiBold}
              fontSize={16}
              numberOfLines={1}>
              {item?.title}
            </Typography>
            <Typography
              color={colors.primaryTextLight}
              fontSize={13.5}
              numberOfLines={2}
              lineHeight={17}>
              {item?.description}
            </Typography>
          </View>
        </View>

        <View
          style={{
            paddingTop: 12,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: isSelected(item?._id)
              ? 'space-between'
              : 'flex-end',
          }}>
          <Typography fontSize={20} fontFamily={fonts.poppinsSemiBold}>
            ${item?.price}
          </Typography>

          {isSelected(item?._id) && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 28,
                  width: 28,
                  borderWidth: 0.5,
                  borderRadius: 6,
                  borderColor: colors.inputplaceholder,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather
                  name="minus"
                  size={20}
                  color={colors.primaryTextLight}
                />
              </TouchableOpacity>
              <Typography>2</Typography>
              <TouchableOpacity
                style={{
                  height: 28,
                  width: 28,
                  borderWidth: 0.5,
                  borderRadius: 6,
                  borderColor: colors.inputplaceholder,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather
                  name="plus"
                  size={20}
                  color={colors.primaryTextLight}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <FontAwesome
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          name={isSelected(item?._id) ? 'check-square' : 'square-o'}
          size={20}
          color={colors.primary}
        />
      </View>
    ),
    [products],
  );

  useEffect(() => {
    if (getProductsApi.data) {
      dispatch(setProducts(getProductsApi.data.data ?? []));
    }
  }, [getProductsApi.data]);

  return (
    <>
      <Header leftIcon />
      <View
        style={{
          paddingHorizontal: 14,
          paddingTop: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
        <Typography fontSize={20} fontFamily={fonts.poppinsMedium}>
          Products
        </Typography>
        <Typography fontSize={15}>
          Pick products used during this job.
        </Typography>
      </View>

      <View style={{paddingTop: 16, paddingBottom: 0}}>
        <SearchBar value="" setValue={() => {}} placeholder="Search products" />
      </View>

      <AppFlatlist
        refreshing={getProductsApi.loading}
        onRefresh={getProductsApi.request}
        data={products}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 14,
        }}
        paddingBottom={20}
      />
    </>
  );
};

export default CompleteJob;
