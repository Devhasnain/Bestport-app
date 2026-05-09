import { Button, View, AppFlatlist, Header, SearchBar, Typography, ConfirmationModal, ProductCard, Pagination, AppBottomSheet, } from '@/components/index';
import { showToast, getErrorMessage, showErrorAlert } from '@/utils/index';
import { useModal, useProducts, useCompleteJob } from '@/hooks/index';
import { navigate, replace } from '@/navigation/NavigationService';
import React, { useCallback, useEffect, useState } from 'react';
import { IProduct, SelectedProductProps } from '@/types/index';
import styles from '@/styles/completeJob.styles';
import { colors, fonts } from '@/config/index';

import JobInvoice from './JobInvoice';


const CompleteJob = ({route}: any) => {
  const [receivedAmount, setReceivedAmount] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const {data, isPending, refetch, error} = useProducts({
    page,
    limit: 10,
    search,
  });
  const completeJobReq = useCompleteJob();
  const confirmModal = useModal();
  const invoiceModal = useModal();
  const completeSuccessModal = useModal();
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductProps[] | []
  >([]);

  // const completeJobApi = usePut(endpoints.completedJob(route?.params?.id));

  const isSelected = useCallback(
    (id: string) => {
      return selectedProducts?.find(item => item?.product?._id === id);
    },
    [selectedProducts],
  );

  const incrementQuantity = useCallback(
    (id: string) => {
      setSelectedProducts(pre =>
        pre?.map(item => {
          if (item?.product?._id === id) {
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
          if (item?.product?._id === id) {
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
        pre?.find(item => item?.product?._id === product?._id)
          ? pre?.filter(item => item?.product?._id !== product?._id)
          : [{product: product, quantity: 1}, ...pre],
      );
    },
    [selectedProducts],
  );

  const productDetails = useCallback((id: string) => {
    navigate('Product', {id});
  }, []);

  const renderItem = useCallback(
    ({item, index}: any) => (
      <ProductCard
        item={item}
        key={index}
        productDetails={productDetails}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        handleSelectProduct={handleSelectProduct}
        isSelected={e => isSelected(e as string)}
      />
    ),
    [products, selectedProducts],
  );

  const handleConfirmComplete = useCallback(async () => {
    try {
      // await completeJobApi.request({payload: {products: selectedProducts}});
      confirmModal.closeModal();
      // dispatch(empMarkJobComplete(route?.params?.id));
      showToast('Job completed');
      // completeSuccessModal.openModal();
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }, [selectedProducts, confirmModal]);

  const closeSuccessModal = useCallback(() => {
    completeSuccessModal.closeModal();
    replace('App');
  }, [selectedProducts, completeSuccessModal]);

  const onCompleteJob = () => {
    let amount = Number(receivedAmount);
    if (!amount || amount > 50000) {
      showErrorAlert(
        'Error',
        `Collected amout should be greater than 0 and less then or equals to 50000`,
      );
      return;
    }
    const payload = {
      products: selectedProducts,
      receivedAmount: Number(receivedAmount),
      ...route.params,
    };
    completeJobReq.mutate(payload, {
      onSuccess: () => {
        showToast('Job completed');
        replace('App');
      },
      onError: error => showErrorAlert('Error', getErrorMessage(error)),
    });
  };

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data?.data?.products);
    }
  }, [data]);

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
        refreshing={isPending}
        onRefresh={refetch}
        data={products}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 14,
        }}
        ListFooterComponent={
          <>
            {!isPending && !error ? (
              <Pagination
                currentPage={page}
                totalPages={data?.data?.pagination?.totalPages}
                onPageChange={setPage}
              />
            ) : (
              <View />
            )}
          </>
        }
        paddingBottom={20}
      />

      <View style={{paddingVertical: 10, paddingHorizontal: 14}}>
        <Button
          title={'Continue'}
          disabledTitleStyle={{backgroundColor: colors.btnDisabled}}
          onPress={invoiceModal.openModal}
          buttonStyle={{
            minHeight: 50,
            borderRadius: 12,
            backgroundColor: colors.btnPrimary,
          }}
        />
      </View>

      <ConfirmationModal
        // loading={completeJobApi.loading}
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

      <AppBottomSheet
        open={invoiceModal.isOpen}
        onClose={invoiceModal.closeModal}
        snapPoints={['85%']}>
        <JobInvoice
          selectedProducts={selectedProducts}
          receivedAmount={receivedAmount}
          setReceivedAmount={setReceivedAmount}
          onCompleteJob={onCompleteJob}
          loading={completeJobReq.isPending}
        />
      </AppBottomSheet>
    </>
  );
};

export default CompleteJob;
