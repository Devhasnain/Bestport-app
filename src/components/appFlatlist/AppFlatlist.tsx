import {
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
  FlatListProps,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import NoResultsFound from '@components/NoResultsFound';
import colors from '@config/Colors';

const AppFlatlist = ({
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
  ListEmptyComponentStyles = {},
  ListEmptyComponentTitle = 'No results found.',
  contentContainerStyle = {},
  renderItem,
  ...props
}: FlatListProps<any> & any) => {
  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    [],
  );

  const renderEmptyComponent = useMemo(
    () => () =>
      (
        <NoResultsFound
          title={ListEmptyComponentTitle}
          additionalStyles={ListEmptyComponentStyles}
        />
      ),
    [ListEmptyComponentTitle, ListEmptyComponentStyles],
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
      contentContainerStyle={[contentContainerStyle]}
      {...props}
    />
  );
};

export default React.memo(AppFlatlist);
