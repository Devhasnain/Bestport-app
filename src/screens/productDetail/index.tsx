import { MaterialIcons, TextAccordion, Typography, View, ScrollView, TouchableOpacity, Image, } from '@/components/index';
import { StyleSheet, Dimensions } from 'react-native';
import { useProductById } from '@/hooks/index';
import { colors, fonts } from '@/config/index';
import React from 'react';


const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }: any) => {
  const { data } = useProductById(route.params.id);
  const product = data?.data;

  return (
    <View style={styles.mainContainer}>
      {/* Floating Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
        activeOpacity={0.9}>
        <MaterialIcons
          name="arrow-back-ios"
          size={18}
          color={colors.btnPrimary}
          style={{ marginLeft: 5 }} // To center the ios icon properly
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product?.image?.path }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentCard}>
          <View style={styles.headerRow}>
            <Typography 
              fontSize={24} 
              fontFamily={fonts.poppinsSemiBold} 
              style={styles.title}
            >
              {product?.title?.trim()}
            </Typography>
            <View style={styles.priceBadge}>
              <Typography
                fontSize={18}
                fontFamily={fonts.poppinsBold}
                style={{ color: colors.white }}>
                ${product?.price}
              </Typography>
            </View>
          </View>

          <View style={styles.divider} />

          <Typography 
            fontSize={16} 
            fontFamily={fonts.poppinsMedium} 
            style={{ marginBottom: 8, color: colors.primaryText }}
          >
            Description
          </Typography>
          
          <TextAccordion 
            charLimit={150} 
            text={product?.description} 
            textStyle={styles.description}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backButton: {
    height: 45,
    width: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS/Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    width: width,
    height: 420,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentCard: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -30, // Image ke upar overlay effect
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    flex: 1,
    color: '#333',
    marginRight: 10,
  },
  priceBadge: {
    backgroundColor: colors.btnPrimary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 20,
  },
  description: {
    lineHeight: 24,
    color: '#666',
  }
});

export default ProductDetail;