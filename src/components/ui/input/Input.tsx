import { Image, ImageSourcePropType, TouchableOpacity, } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { InputFieldProps } from '@/types/index';
import { colors, fonts } from '@/config/index';
import { Input } from '@rneui/themed';

import { InputErrorMessage } from './InputErrorMessage';
import Styles from './input.style';


export const InputField: React.FC<InputFieldProps> = memo(({
  label = '',
  value = '',
  placeholder = '',
  keyboardType = 'default',
  inputType = '',
  placeholderTextColor = colors.inputplaceholder,
  editable = true,
  secureTextEntry = false,
  inputContainerStyle = Styles.inputContainerStyle,
  containerStyle = Styles.containerStyle,
  inputStyle = Styles.inputStyle,
  inputFieldAdditionalStyle = {},
  additionalStyle = {},
  inputAdditionalStyle = {},
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  pressOnLeftIcon = () => {},
  pressOnRightIcon = () => {},
  leftIconType = 'image',
  rightIconType = 'image',
  leftIcon = '',
  rightIcon = '',
  maxLength = 10000,
  error = '',
  numberOfLines = 1,
  multiline = false,
  inputMode = 'text',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  const rightPress = useCallback(() => {
    pressOnRightIcon();
  }, [pressOnRightIcon]);

  const leftPress = useCallback(() => {
    pressOnLeftIcon();
  }, [pressOnLeftIcon]);

  const renderRightIcon = () => {
    if (!rightIcon) return null;
    return (
      <TouchableOpacity onPress={rightPress}>
        {rightIconType === 'icon' ? (
          rightIcon
        ) : (
          <Image source={rightIcon as ImageSourcePropType} />
        )}
      </TouchableOpacity>
    );
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    return (
      <TouchableOpacity onPress={leftPress}>
        {leftIconType === 'icon' ? (
          leftIcon
        ) : (
          <Image source={leftIcon as ImageSourcePropType} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Input
      label={label ? label : placeholder}
      labelStyle={{
        fontSize: 13.5,
        fontFamily: fonts.poppinsMedium,
        fontWeight: '600',
        color: colors.primaryTextLight,
      }}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      onChangeText={onChange}
      maxLength={maxLength}
      onBlur={handleBlur}
      onFocus={handleFocus}
      editable={editable}
      inputMode={inputMode}
      secureTextEntry={inputType === 'password' ? secureText : secureTextEntry}
      inputContainerStyle={[
        inputContainerStyle,
        inputAdditionalStyle,
        error ? {borderColor: 'red', marginBottom: -3} : {},
        isFocused
          ? {borderColor: colors.activeInputBorderColor, borderWidth: 1.5}
          : {},
        multiline ? {paddingTop: 3, paddingBottom: 8} : {},
      ]}
      numberOfLines={numberOfLines}
      multiline={multiline}
      containerStyle={[
        containerStyle,
        inputType === 'textarea' && Styles.textAreaContainer,
        additionalStyle,
      ]}
      inputStyle={[
        inputStyle,
        inputType === 'textarea' && Styles.textAreaInput,
        inputFieldAdditionalStyle,
      ]}
      leftIcon={rightIcon && renderLeftIcon()}
      rightIcon={
        inputType === 'password' ? (
          <Feather
            onPress={() => setSecureText(!secureText)}
            name={secureText ? 'eye' : 'eye-off'}
            size={20}
            color={colors.inputplaceholder}
          />
        ) : (
          leftIcon && renderRightIcon()
        )
      }
      errorMessage={error}
      errorStyle={{color: colors.authLinkText}}
      ErrorComponent={() => <>{error && <InputErrorMessage error={error} />}</>}
    />
  );
});