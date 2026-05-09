import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import { PaginationProps } from '../types';
import { colors } from '../config';


export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPaginationGroup = () => {
    let pages = [];
    const threshold = 2; // Current page ke aagay peeche kitne numbers dikhane hain

    for (let i = 1; i <= totalPages; i++) {
      // Logic: Hamesha 1st, Last, aur Current page ke aas paas ke numbers dikhao
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - threshold && i <= currentPage + threshold)
      ) {
        pages.push(i);
      } else if (
        i === currentPage - threshold - 1 ||
        i === currentPage + threshold + 1
      ) {
        pages.push('...');
      }
    }
    // Duplicate dots hatane ke liye filter
    return pages.filter((item, index) => pages.indexOf(item) === index);
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      {totalPages > 1 && (
        <TouchableOpacity
          disabled={currentPage <= 1}
          onPress={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          style={[styles.arrowButton, currentPage === 1 && styles.disabled]}>
          <Icon
            name="chevron-left"
            size={28}
            color={currentPage === 1 ? colors.secondary : colors.btnPrimary}
          />
        </TouchableOpacity>
      )}

      {/* Page Numbers & Dots */}
      {totalPages > 1 &&<View style={styles.pageNumbersContainer}>
        {getPaginationGroup().map((page, index) => (
          <View key={index} style={styles.itemWrapper}>
            {page === '...' ? (
              <Text style={styles.dots}>...</Text>
            ) : (
              <TouchableOpacity
                style={[
                  styles.pageButton,
                  currentPage === page && styles.activePageButton,
                ]}
                onPress={() => onPageChange(Number(page))}>
                <Text
                  style={[
                    styles.pageText,
                    currentPage === page && styles.activePageText,
                  ]}>
                  {page}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>}

      {/* Next Button */}
      {totalPages > 1 && (
        <TouchableOpacity
          disabled={currentPage >= totalPages || totalPages <= 1}
          onPress={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          style={[
            styles.arrowButton,
            currentPage === totalPages && styles.disabled,
          ]}>
          <Icon
            name="chevron-right"
            size={28}
            color={
              currentPage === totalPages ? colors.secondary : colors.btnPrimary
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    minWidth: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    borderRadius: 17.5, // Circular shape
    backgroundColor: colors.white,
  },
  activePageButton: {
    backgroundColor: colors.btnPrimary,
  },
  pageText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activePageText: {
    color: '#fff',
  },
  dots: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 2,
  },
  arrowButton: {
    padding: 5,
    marginHorizontal: 10,
  },
  disabled: {
    opacity: 0.3,
  },
});
