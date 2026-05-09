import { NoResultsFound, ActivityIndicator, RefreshControl, FlatList, View, } from '@/components/index';
import React, { memo, useCallback, useMemo } from 'react';
import { FlatListProps } from 'react-native';
import colors from '@/config/Colors';


export const AppFlatlist = memo(
  ({
    data = [],
    refreshing = false,
    onRefresh = () => {},
    onEndReached = () => {},
    onEndReachedThreshold = 0.5,
    ListFooterComponent,
    showLoadMore = false,
    initialNumToRender = 10,
    maxToRenderPerBatch = 10,
    windowSize = 5,
    removeClippedSubviews = true,
    updateCellsBatchingPeriod = 50,
    contentContainerStyle = {},
    renderItem,
    paddingBottom = 110,
    ...props
  }: FlatListProps<any> & any) => {
    const keyExtractor = useCallback(
      (_: any, index: number) => index.toString(),
      [],
    );

    const renderFooter = useMemo(
      () =>
        showLoadMore ? (
          <View style={{paddingVertical: 16}}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          ListFooterComponent || null
        ),
      [showLoadMore, ListFooterComponent],
    );

    const refreshControl = useMemo(
      () => (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      ),
      [refreshing, onRefresh],
    );

    const renderEmptyComponent = useMemo(() => {
      if (refreshing) {
        return <View />;
      } else {
        return <NoResultsFound title={'No results found.'} />;
      }
    }, [refreshing]);

    return (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={refreshControl}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch}
        windowSize={windowSize}
        removeClippedSubviews={removeClippedSubviews}
        updateCellsBatchingPeriod={updateCellsBatchingPeriod}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          contentContainerStyle,
          {
            paddingBottom: paddingBottom,
          },
        ]}
        {...props}
      />
    );
  },
);
