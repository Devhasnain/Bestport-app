import React, { memo, ReactNode, useCallback, useState } from 'react';
import { Image, ImageSourcePropType, KeyboardTypeOptions, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Input } from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';

import Styles from './input.style';
import InputErrorMessage from './InputErrorMessage';
import colors from '@config/Colors';

interface InputFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  inputType?: string;
  placeholderTextColor?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputFieldAdditionalStyle?: StyleProp<TextStyle>;
  additionalStyle?: StyleProp<ViewStyle>;
  inputAdditionalStyle?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  pressOnLeftIcon?: () => void;
  pressOnRightIcon?: () => void;
  leftIconType?: 'icon' | 'image';
  rightIconType?: 'icon' | 'image';
  leftIcon?: any;
  rightIcon?: any;
  maxLength?: number;
  error?: any;
  numberOfLines?: number;
  multiline?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
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
        error ? { borderColor: 'red', marginBottom: -3 } : {},
        isFocused ? { borderColor: colors.activeInputBorderColor, borderWidth: 1.5 } : {},
        multiline ? {paddingTop:3, paddingBottom:8} : {}
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
            color={colors.primaryTextLight}
          />
        ) : (
          leftIcon && renderRightIcon()
        )
      }
      errorMessage={error}
      errorStyle={{ color: colors.authLinkText }}
      ErrorComponent={() => <>{error && <InputErrorMessage error={error} />}</>}
    />
  );
};

export default memo(InputField);
