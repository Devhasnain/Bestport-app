import {ImageBackground} from 'react-native';
import React, {ReactNode} from 'react';
import images from '@config/Images';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  px?:number
};

const BackgroundImgContainer = ({children, px = 16}: Props) => {
  return (
    <ImageBackground source={images.appBackground} style={{flex: 1}}>
      <SafeAreaView style={{paddingHorizontal: px}}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default BackgroundImgContainer;
