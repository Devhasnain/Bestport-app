import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';


interface SkeletonBoxProps {
  width?: any;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const SkeletonBox = ({ width: w = '100%', height = 16, borderRadius = 8, style }: SkeletonBoxProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[{ width: w, height, borderRadius, backgroundColor: '#E0E0E0', opacity }, style]} />
  );
};

export const PageSkeleton = () => (
  <View style={styles.container}>

    {/* Header */}
    <View style={styles.row}>
      <SkeletonBox width={40} height={40} borderRadius={20} />
      <SkeletonBox width="50%" height={16} style={{ marginLeft: 12 }} />
    </View>

    {/* Lines */}
    {[...Array(6)].map((_, i) => (
      <SkeletonBox
        key={i}
        width={i % 3 === 0 ? '60%' : '100%'}
        height={14}
        style={{ marginBottom: 12 }}
      />
    ))}

    {/* Block */}
    <SkeletonBox height={120} borderRadius={12} style={{ marginVertical: 16 }} />

    {/* More Lines */}
    {[...Array(4)].map((_, i) => (
      <SkeletonBox
        key={i}
        width={i % 2 === 0 ? '80%' : '100%'}
        height={14}
        style={{ marginBottom: 12 }}
      />
    ))}

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:50,
    paddingHorizontal:16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
});