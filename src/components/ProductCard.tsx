import { Feather, FontAwesome, Image, TouchableOpacity, Typography, View, } from '@/components/index';
import styles from '@/styles/productCard.styles';
import { ProductCardProps } from '@/types/index';
import { colors, fonts } from '@/config/index';
import React, { memo } from 'react';


export const ProductCard = memo(
  ({
    item,
    productDetails,
    isSelected,
    handleSelectProduct,
    decrementQuantity,
    incrementQuantity,
  }: ProductCardProps) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeaderContainer}>
          <TouchableOpacity
            onPress={() => productDetails(item?._id)}
            activeOpacity={0.8}
            style={styles.cardImageContainer}>
            <Image
              alt=""
              source={{uri: item?.image?.path}}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View style={styles.cardTextContainer}>
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
          style={[
            styles.cardPriceContainer,
            isSelected(item?._id)
              ? styles.priceJustifyBtw
              : styles.priceFlexEnd,
          ]}>
          <Typography fontSize={20} fontFamily={fonts.poppinsSemiBold}>
            ${item?.price}
          </Typography>

          {isSelected(item?._id) && (
            <View style={styles.cardQtyBtnsContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => decrementQuantity(item?._id)}
                style={styles.cardQtyBtn}>
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
                style={styles.cardQtyBtn}>
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
          style={styles.cardCheckedIcon}
          name={isSelected(item?._id) ? 'check-square' : 'square-o'}
          size={20}
          color={colors.primary}
        />
      </View>
    );
  },
);
