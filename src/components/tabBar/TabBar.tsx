import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useRef, useState, useMemo} from 'react';
import fonts from '../../config/Fonts';
import styles from './TabBar.style';
import Typography from '@components/ui/Typography';
import colors from '@config/Colors';

const {width} = Dimensions.get('window');
const TAB_WIDTH = 105;

type Props = {
  tabs: any[];
  containerStyle?: ViewStyle;
};

const TabBar = ({tabs = [], containerStyle}: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);

  const centerTab = useCallback((index: number) => {
    const offset = TAB_WIDTH * index - width / 2 + TAB_WIDTH / 2;
    if (flatListRef.current) {
      flatListRef.current?.scrollToOffset({
        offset: Math.max(0, offset),
        animated: true,
      });
    }
  }, []);

  const onTabPress = useCallback(
    (index: number) => {
      setActiveTab(index);
      centerTab(index);
      scrollRef.current?.scrollTo({x: width * index, animated: true});
    },
    [centerTab],
  );

  const onScrollEnd = useCallback(
    (e: any) => {
      const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
      setActiveTab(newIndex);
      centerTab(newIndex);
    },
    [centerTab],
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    [],
  );

  const renderTab = useCallback(
    ({item, index}: any) => {
      const isActive = index === activeTab;
      return (
        <TouchableOpacity
          onPress={() => onTabPress(index)}
          activeOpacity={0.6}
          style={styles.tabBtn(isActive)}>
          <Typography
            fontSize={13}
            lineHeight={20}
            fontFamily={isActive ? fonts.poppinsSemiBold : fonts.poppinsMedium}
            color={isActive ? colors.primaryBtnText : colors.primaryTextLight}>
            {item?.title}
          </Typography>
        </TouchableOpacity>
      );
    },
    [activeTab, onTabPress],
  );

  const tabScreens = useMemo(
    () =>
      tabs.map((tab, index) => (
        <View key={index.toString()} style={[{width, flex: 1}, containerStyle]}>
          {activeTab === index ? (
            tab.component
          ) : (
            <ActivityIndicator
              size={30}
              //   style={globalStyle.marginTop(50)}
              color={colors.primary}
            />
          )}
        </View>
      )),
    [tabs, activeTab, containerStyle],
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={[
          {
            paddingHorizontal: 12,
            gap: 12,
          },
        ]}
        style={{
          minHeight: 50,
          maxHeight: 50,
          paddingBottom: 16,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tabs}
        keyExtractor={keyExtractor}
        renderItem={renderTab}
        extraData={activeTab}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        removeClippedSubviews
        scrollEventThrottle={16}>
        {tabScreens}
      </ScrollView>
    </>
  );
};

export default memo(TabBar);
