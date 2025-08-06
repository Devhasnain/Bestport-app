import { AppFlatlist, Feather, FontAwesome, Header, SearchBar, Typography, } from '@components/index';
import ConfirmationModal from '@components/confirmationalModal/ConfirmationModal';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { changeStack, navigate } from '@navigation/NavigationService';
import { getProducts, setProducts } from '@store/productsSlice';
import { View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import getErrorMessage from '@utils/getErrorMessage';
import { empMarkJobComplete } from '@store/jobSlice';
import { showToast } from '@utils/showToast';
import { useModal } from '@hooks/useModal';
import { ScreenWidth } from '@rneui/base';
import endpoints from '@api/endpoints';
import { usePut } from '@hooks/usePut';
import { useGet } from '@hooks/useGet';
import { Button } from '@rneui/themed';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


type SelectedProduct = {
  product:string;
  quantity:number
}


const CompleteJob = ({route}:any) => {
  const confirmModal = useModal();
  const completeSuccessModal = useModal();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const getProductsApi = useGet({
    endpoint: endpoints.getProducts,
    autoFetch: !products?.length,
  });
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[] | []>([]);

  const completeJobApi = usePut(endpoints.completedJob(route?.params?.id))

  const filteredProducts = useMemo(() => {
    return search?.trim()?.length
      ? products?.filter((item: any) =>
          item?.title?.toLowerCase()?.includes(search?.toLowerCase()),
        )
      : products;
  }, [search, products]);

  const isSelected = useCallback(
    (id: string) => {
      return selectedProducts?.find(item => item?.product === id);
    },
    [selectedProducts],
  );

  const incrementQuantity = useCallback(
    (id: string) => {
      setSelectedProducts((pre) =>
        pre?.map((item) => {
          if (item?.product === id) {
            return {...item, quantity: item?.quantity + 1};
          } else return item;
        }),
      );
    },
    [selectedProducts],
  );

  const decrementQuantity = useCallback(
    (id: string) => {
      setSelectedProducts((pre) =>
        pre?.map((item) => {
          if (item?.product === id) {
            if (item?.quantity > 1) {
              return {...item, quantity: item?.quantity - 1};
            } else {
              return {...item, quantity: 1};
            }
          } else return item;
        }),
      );
    },
    [selectedProducts],
  );

  const handleSelectProduct = useCallback(
    (product: any) => {
      setSelectedProducts((pre) =>
        pre?.find((item) => item?.product === product?._id)
          ? pre?.filter((item) => item?.product !== product?._id)
          : [{product:product?._id, quantity: 1}, ...pre],
      );
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
                activeOpacity={0.8}
                onPress={() => decrementQuantity(item?._id)}
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
              <Typography>{isSelected(item?._id)?.quantity}</Typography>
              <TouchableOpacity
                onPress={() => incrementQuantity(item?._id)}
                activeOpacity={0.8}
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
          onPress={() => handleSelectProduct(item)}
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
    [products, selectedProducts],
  );

  const handleConfirmComplete = useCallback(async()=>{
    try {
      await completeJobApi.request({payload:{products:selectedProducts}});
      confirmModal.closeModal();
      dispatch(empMarkJobComplete(route?.params?.id));
      completeSuccessModal.openModal();
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  },[selectedProducts,confirmModal]);

  const closeSuccessModal = useCallback(()=>{
    completeSuccessModal.closeModal();
    changeStack("App");
  },[selectedProducts,completeSuccessModal]);

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
        <SearchBar
          value={search}
          setValue={setSearch}
          placeholder="Search products"
        />
      </View>

      <AppFlatlist
        refreshing={getProductsApi.loading}
        onRefresh={getProductsApi.request}
        data={filteredProducts}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 14,
        }}
        paddingBottom={20}
      />

      <View style={{paddingVertical: 10, paddingHorizontal: 14}}>
        <Button
          title={'Continue'}
          disabledTitleStyle={{backgroundColor: colors.btnDisabled}}
          // loading={loading}
          // disabled={loading}
          onPress={confirmModal.openModal}
          buttonStyle={{
            minHeight: 50,
            borderRadius: 12,
            backgroundColor: colors.btnPrimary,
          }}
        />
      </View>

      <ConfirmationModal
      loading={completeJobApi.loading}
      isOpen={confirmModal.isOpen}
      onCancel={confirmModal.closeModal}
      onConfirm={handleConfirmComplete}
      width={"90%"}
      title='Mark Job as Completed'
      description='Are you sure you’ve finished this job? This will notify the customer and admin that the work is complete.'
      />

       <ConfirmationModal
      isOpen={completeSuccessModal.isOpen}
      onConfirm={closeSuccessModal}
      confirmTitle='Home'
      width={"90%"}
      title='Job Completed Successfully'
      description='You’ve marked this job as completed. The customer and admin have been notified. Great work!'
      />
    </>
  );
};

export default CompleteJob;
