import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useRef, } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';


type Props = {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children: ReactNode;
  snapPoints?: string[];
  contentContainerStyle?: object;
};

export type AppBottomSheetRef = {
  present: () => void;
  dismiss: () => void;
};

export const AppBottomSheet = forwardRef<
  AppBottomSheetRef,
  Props
>(
  (
    {
      open,
      onClose,
      onOpen,
      children,
      snapPoints = ['40%'],
      contentContainerStyle = {},
    },
    ref,
  ) => {
    const bottomSheetRef =
      useRef<BottomSheetModal>(null);

    const memoizedSnapPoints = useMemo(
      () => snapPoints,
      [snapPoints],
    );

    /**
     * Open / Close Handling
     */
    useEffect(() => {
      if (open) {
        bottomSheetRef.current?.present();
        onOpen?.();
      } else {
        bottomSheetRef.current?.dismiss();
      }
    }, [open, onOpen]);

    /**
     * Expose methods
     */
    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetRef.current?.present();
      },

      dismiss: () => {
        bottomSheetRef.current?.dismiss();
      },
    }));

    return (
      <BottomSheetModal
      index={0}
        ref={bottomSheetRef}
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose
        onDismiss={onClose}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        )}>
        <BottomSheetView
          style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    padding: 20,
  },
});