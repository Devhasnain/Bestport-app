import colors from '@config/Colors';
import fonts from '@config/Fonts';
import React, { memo, ReactNode } from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

type Props = {
  children?:ReactNode,
  fontFamily?:any,
  fontSize?:number,
  lineHeight?:number,
  color?:string,
  style?:TextStyle,
  onPress?:()=>void
}

const Typography = ({
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
};
export default memo(Typography);
