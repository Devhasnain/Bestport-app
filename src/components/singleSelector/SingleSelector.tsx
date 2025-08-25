import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ViewStyle, Keyboard, } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, } from '@gorhom/bottom-sheet';
import React, { memo, useMemo, useState, useCallback, useRef } from 'react';
import { FontAwesome, NoResultsFound } from '@components/index';
import Typography from '@components/ui/Typography';
import { isIOS, ScreenHeight } from '@rneui/base';
import images from '@config/Images';
import colors from '@config/Colors';
import fonts from '@config/Fonts';


type Props = {
  loading?: boolean;
  placeholder: string;
  data: any[];
  snapPoints?: string[];
  containerStyles?: ViewStyle;
  value: string;
  valueField?: 'value' | string;
  labelField?: 'label' | string;
  setValue?: any;
  onChange?: any;
  error?: any;
  contentContainerStyle?: ViewStyle;
};

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
  contentContainerStyle = {},
}: Props) => {
  const bottomSheetModalRef = useRef<any>(null);
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
      closeSheet();
    },
    [setValue, onChange],
  );

  const openSheet = useCallback(() => {
    Keyboard.dismiss();
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

  return (
    <View style={[containerStyles]}>
      <Typography
      fontFamily={fonts.poppinsMedium}
      color={colors.primaryTextLight}
      fontSize={13.5}
      style={{
        fontWeight:"600",
        marginBottom:1
      }}
      >
        {placeholder}
      </Typography>
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
          onPress={openSheet}>
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
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 16}}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={contentContainerStyle}>
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
                    {isSelected && (
                      <FontAwesome
                        name="check-square"
                        size={22}
                        color={colors.primary}
                      />
                    )}
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
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

const dropdownButton = (error: any): ViewStyle => ({
  padding: 14,
  borderWidth: isIOS ? 1: 1.5,
  borderColor: error ? colors.activeInputBorderColor : colors.inputBorder,
  borderRadius: 12,
  backgroundColor: colors.btnSecondary,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const option = (isActive: any): ViewStyle => ({
  backgroundColor: 'transparent',
  paddingHorizontal: 2,
  paddingVertical: 15,
  borderBottomWidth: 0.5,
  borderBottomColor: colors.gray,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export default memo(SingleSelect);
