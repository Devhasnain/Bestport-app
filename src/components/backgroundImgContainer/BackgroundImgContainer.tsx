import { ImageBackground, View } from 'react-native';
import { ScreenHeight } from '@rneui/base';
import React, { ReactNode } from 'react';
import images from '@config/Images';


type Props = {
  children: ReactNode;
};

const BackgroundImgContainer = ({children}: Props) => {
  return (
    <View style={{flex: 1, minHeight: ScreenHeight, backgroundColor:"white"}}>
      <ImageBackground source={images.appBackground} style={{flex: 1}}>
          {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundImgContainer;
