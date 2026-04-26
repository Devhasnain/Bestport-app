import { Button, View, AppFlatlist, Header, SearchBar, Typography, ConfirmationModal, ProductCard, } from '@components/index';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { changeStack, navigate } from '@navigation/NavigationService';
import { getProducts, setProducts } from '@store/productsSlice';
import { showToast, getErrorMessage } from '@utils/index';
import { useGet, usePut, useModal } from '@hooks/index';
import { useDispatch, useSelector } from 'react-redux';
import { empMarkJobComplete } from '@store/jobSlice';
import { SelectedProductProps } from '@types/index';
import styles from '@styles/completeJob.styles';
import { colors, fonts } from '@config/index';
import endpoints from '@api/endpoints';


const CompleteJob = ({route}: any) => {
  const confirmModal = useModal();
  const completeSuccessModal = useModal();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const getProductsApi = useGet({
    endpoint: endpoints.getProducts,
    autoFetch: !products?.length,
  });
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductProps[] | []
  >([]);

  const completeJobApi = usePut(endpoints.completedJob(route?.params?.id));

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
      setSelectedProducts(pre =>
        pre?.map(item => {
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
      setSelectedProducts(pre =>
        pre?.map(item => {
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
      setSelectedProducts(pre =>
        pre?.find(item => item?.product === product?._id)
          ? pre?.filter(item => item?.product !== product?._id)
          : [{product: product?._id, quantity: 1}, ...pre],
      );
    },
    [selectedProducts],
  );

  const productDetails = useCallback((id: string) => {
    navigate('Product', {id});
  }, []);

  const renderItem = useCallback(
    ({item,index}: any) => (
      <ProductCard
      item={item}
      key={index}
      productDetails={productDetails}
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
      handleSelectProduct={handleSelectProduct}
      isSelected={isSelected}
      />
    ),
    [products, selectedProducts],
  );

  const handleConfirmComplete = useCallback(async () => {
    try {
      await completeJobApi.request({payload: {products: selectedProducts}});
      confirmModal.closeModal();
      dispatch(empMarkJobComplete(route?.params?.id));
      completeSuccessModal.openModal();
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, [selectedProducts, confirmModal]);

  const closeSuccessModal = useCallback(() => {
    completeSuccessModal.closeModal();
    changeStack('App');
  }, [selectedProducts, completeSuccessModal]);

  useEffect(() => {
    if (getProductsApi.data) {
      dispatch(setProducts(getProductsApi.data.data?.products ?? []));
    }
  }, [getProductsApi.data]);

  console.log(products,'alll products')

  return (
    <>
      <Header leftIcon={true} />
      <View style={styles.pickProductsContainer}>
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
        width={'90%'}
        title="Mark Job as Completed"
        description="Are you sure you’ve finished this job? This will notify the customer and admin that the work is complete."
      />

      <ConfirmationModal
        isOpen={completeSuccessModal.isOpen}
        onConfirm={closeSuccessModal}
        confirmTitle="Home"
        width={'90%'}
        title="Job Completed Successfully"
        description="You’ve marked this job as completed. The customer and admin have been notified. Great work!"
      />
    </>
  );
};

export default CompleteJob;
