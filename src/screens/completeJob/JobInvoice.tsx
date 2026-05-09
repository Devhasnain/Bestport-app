import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, } from 'react-native';
import { SelectedProductProps } from '@/types/completeJob.types';
import colors from '@/config/Colors';
import React from 'react';


const JobInvoice = ({loading, selectedProducts, receivedAmount, setReceivedAmount, onCompleteJob }:{
    selectedProducts:SelectedProductProps[],
    receivedAmount:string,
    setReceivedAmount:(e:string)=>void;
    onCompleteJob:()=>void;
    loading:boolean
}) => {

  // Total calculation based on product prices and quantities
  const calculateTotal = () => {
    return selectedProducts.reduce((sum, item) => sum + (item?.product?.price * (item.quantity || 1)), 0);
  };

  const renderProductItem = ({item}:{item:SelectedProductProps}) => (
    <View style={styles.productRow}>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item?.product?.title}</Text>
        <Text style={styles.productDetails}>Qty: {item?.quantity || 1} x USD. {item?.product?.price || 0}</Text>
      </View>
      <Text style={styles.productTotal}>USD. {item?.product?.price * (item?.quantity || 1)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Invoice</Text>

       {/* Input for Amount Received */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount Collected from Customer
            <Text
            style={{color:"red"}}
            >
            *
            </Text>
            </Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={receivedAmount}
            onChangeText={setReceivedAmount}
          />
        </View>
      
      {/* Products List */}
      <FlatList
        data={selectedProducts}
        keyExtractor={(_,i) => i?.toString()}
        renderItem={renderProductItem}
        scrollEnabled={false} // Bottom sheet ke andar agar scroll issue ho
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() => (
          <View style={styles.divider} />
        )}
      />

      {/* Totals Section */}
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Material Cost:</Text>
          <Text style={styles.totalValue}>USD. {calculateTotal()}</Text>
        </View>

      {/* Complete Button */}
      <TouchableOpacity 
      activeOpacity={0.8}
        style={styles.completeButton} 
        onPress={loading ? ()=>{}:onCompleteJob}
        disabled={loading}
      >
        {loading && <ActivityIndicator color={colors.white} />}
        <Text style={styles.completeButtonText}>Complete Job & Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:8,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  productDetails: {
    fontSize: 14,
    color: '#888',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  summaryContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom:25,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  completeButton: {
    backgroundColor: colors.btnPrimary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    gap:10
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JobInvoice;