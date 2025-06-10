import {View, Text} from 'react-native';
import React from 'react';
import {BackgroundImgContainer, Feather} from '@components/index';
import {Button} from "@rneui/themed";
import { changeStack } from '@navigation/NavigationService';

const MyListings = () => {
  return (
    <BackgroundImgContainer>
      <View>
        <Text>MyListings</Text>
        <Button onPress={()=>{changeStack("AuthStack")}}>Login</Button>
      </View>
    </BackgroundImgContainer>
  );
};

export default MyListings;
