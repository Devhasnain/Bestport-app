import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  ViewStyle,
} from 'react-native';
import React, {
  memo,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import {useModal} from '@hooks/useModal';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {ScreenHeight} from '@rneui/base';
import NoResultsFound from '@components/NoResultsFound';
import images from '@config/Images';
import colors from '@config/Colors';
import Typography from '@components/ui/Typography';
import fonts from '@config/Fonts';

const SingleSelect = ({
  loading = false,
  placeholder = 'Select',
  data = [],
  snapPoints = ['80%'],
  containerStyles = {},
  value = '',
  valueField = 'value',
  labelField = 'label',
  setValue = () => {},
  onChange = () => {},
  error = '',
}: any) => {
  const bottomSheetModalRef = useRef<any>(null);
  const {isOpen, closeModal, openModal} = useModal();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const selectedLabel = useMemo(() => {
    const selectedItem = data?.find(
      (item: any) => item?.[valueField] === value,
    );
    return selectedItem?.[labelField] ?? placeholder;
  }, [data, value, valueField, labelField, placeholder]);

  const handleSelect = useCallback(
    (selectedValue: any) => {
      setValue(selectedValue);
      onChange(selectedValue);
      closeModal();
    },
    [setValue, onChange],
  );

  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        onPress={closeSheet}
        {...props}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      Keyboard.dismiss();
      openSheet();
    } else {
      closeSheet();
    }
  }, [isOpen]);

  return (
    <View style={[containerStyles]}>
      <>
        <TouchableOpacity
          disabled={loading}
          onFocus={handleFocus}
          activeOpacity={0.8}
          style={[
            dropdownButton(error),
            error && {borderColor: 'red'},
            isFocused && {
              borderColor: colors.activeInputBorderColor,
              borderWidth: 2,
            },
          ]}
          onPress={openModal}>
          <Typography
            color={value ? colors.primaryText : colors.inputplaceholder}
            fontSize={14}>
            {selectedLabel}
          </Typography>
          {loading ? (
            <ActivityIndicator size={18} color={colors.primary} />
          ) : (
            <Image source={images.angleDownImage} />
          )}
        </TouchableOpacity>
        {error && (
          <Text style={{color: colors.authLinkText, fontSize: 12}}>
            {error}
          </Text>
        )}
      </>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        maxDynamicContentSize={ScreenHeight - 300}
        enableDismissOnClose={true}
        enableOverDrag={true}
        backdropComponent={renderBackdrop}>
        {data.length ? (
          <View style={{paddingBottom: 16}}>
            {data.map((item: any, index: number) => {
              const isSelected = item?.[valueField] === value;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={item?.[valueField] ?? index}
                  style={option(isSelected)}
                  onPress={() => handleSelect(item?.[valueField])}>
                  <Typography
                    color={colors.primaryText}
                    fontSize={14}
                    fontFamily={
                      isSelected ? fonts.poppinsMedium : fonts.poppinsRegular
                    }
                    style={{maxWidth: '85%'}}>
                    {item?.[labelField]}
                  </Typography>
                  {isSelected && <Image source={images.checkBoxImg} />}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <NoResultsFound
            additionalStyles={{paddingVertical: 20}}
            title="No results found."
            fontSize={16}
          />
        )}
      </BottomSheetModal>
    </View>
  );
};

const dropdownButton = (error: any): ViewStyle => ({
  padding: 14,
  borderWidth: 1.5,
  borderColor: error ? colors.activeInputBorderColor : colors.inputBorder,
  borderRadius: 12,
  backgroundColor: colors.btnSecondary,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const option = (isActive: any): ViewStyle => ({
  backgroundColor: isActive ? colors.strikeColor : 'transparent',
  padding: 15,
  borderRadius: isActive ? 8 : 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export default memo(SingleSelect);
