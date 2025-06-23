import {ImageBackground, View} from 'react-native';
import React, {ReactNode} from 'react';
import images from '@config/Images';
import {ScreenHeight} from '@rneui/base';

type Props = {
  children: ReactNode;
};

const BackgroundImgContainer = ({children}: Props) => {
  return (
    <View style={{flex: 1, minHeight: ScreenHeight}}>
      <ImageBackground source={images.appBackground} style={{flex: 1}}>
          {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundImgContainer;
