import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {memo, ReactNode} from 'react';

type Props = {
  children: ReactNode;
  contentContainerStyle?: any;
  stickyHeaderIndices?: any[];
};

const KeyboardAvoidingComponent = ({
  children,
  contentContainerStyle,
  stickyHeaderIndices = [],
}: Props) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[contentContainerStyle]}
      stickyHeaderIndices={stickyHeaderIndices}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default memo(KeyboardAvoidingComponent);
