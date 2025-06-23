import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {memo, ReactNode} from 'react';
import {ViewStyle} from 'react-native';

type Props = {
  children: ReactNode;
  contentContainerStyle?: ViewStyle;
  stickyHeaderIndices?: any[];
  extraHeight?: number;
  extraScrollHeight?: number;
};

const KeyboardAvoidingComponent = ({
  children,
  contentContainerStyle,
  stickyHeaderIndices = [],
  extraHeight = 0,
  extraScrollHeight = 0,
}: Props) => {
  return (
    <KeyboardAwareScrollView
      extraHeight={extraHeight}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      extraScrollHeight={extraScrollHeight}
      contentContainerStyle={[contentContainerStyle]}
      stickyHeaderIndices={stickyHeaderIndices}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default memo(KeyboardAvoidingComponent);
