import { Text, TextStyle, TextProps } from 'react-native';
import React, { memo, ReactNode } from 'react';
import { fonts, colors } from '@/config/index';


type Props = {
  children?:ReactNode,
  fontFamily?:any,
  fontSize?:number,
  lineHeight?:number,
  color?:string,
  style?:TextStyle,
  onPress?:()=>void
} & TextProps

export const Typography = memo(({
  children,
  fontFamily = fonts.poppinsRegular,
  fontSize = 16,
  lineHeight = fontSize * 1.4,
  color = colors.primaryText,
  style = {},
  ...props
}: Props) => {
  return (
    <Text
      style={[
        {
          fontFamily,
          fontSize,
          lineHeight,
          color,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
});