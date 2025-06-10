import { ImageBackground } from 'react-native'
import React, { ReactNode } from 'react';
import images from '@config/Images';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    children:ReactNode
}

const BackgroundImgContainer = ({children}:Props) => {
  return (
    <ImageBackground source={images.appBackground} style={{flex:1}}>
            <SafeAreaView
            style={{paddingHorizontal:16}}
            >
        {children}
            </SafeAreaView>
    </ImageBackground>
  )
}

export default BackgroundImgContainer