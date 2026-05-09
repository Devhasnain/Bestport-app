import { KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from "react-native";


export interface InputFieldProps {
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
  inputMode?:
    | 'text'
    | 'numeric'
    | 'decimal'
    | 'email'
    | 'tel'
    | 'url'
    | undefined;
}