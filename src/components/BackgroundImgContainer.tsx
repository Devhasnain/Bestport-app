import { ImageBackground, View, ScreenHeight } from '@/components/index';
import React, { memo, ReactNode } from 'react';
import images from '@/config/Images';


type Props = {
  children: ReactNode;
};

export const BackgroundImgContainer = memo(({children}: Props) => {
  return (
    <View style={{flex: 1, minHeight: ScreenHeight, backgroundColor: 'white'}}>
      <ImageBackground source={images.appBackground} style={{flex: 1}}>
        {children}
      </ImageBackground>
    </View>
  );
})
