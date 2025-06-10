import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AuthLayoutContainer, Typography} from '@components/index';
import fonts from '@config/Fonts';
import colors from '@config/Colors';
import { navigate } from '@navigation/NavigationService';

const roleBtns = [
  {
    title: 'Customer',
    varient: 'solid',
  },
  {
    title: 'Employee',
  },
];

const Welcome = () => {
  return (
    <AuthLayoutContainer>
      <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Typography
          style={{textAlign: 'center'}}
          fontSize={20}
          fontFamily={fonts.poppinsMedium}>
          Welcome to Bestport
        </Typography>
        <Typography
          style={{textAlign: 'center'}}
          fontSize={15}
          fontFamily={fonts.poppinsRegular}>
          Choose your role to get started.
        </Typography>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingVertical: 50,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 40,
        }}>
        {roleBtns.map((item, index) => (
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>navigate("Login")}
            key={index}
            style={{
              borderWidth: 0.5,
              borderColor:
                item.varient === 'solid'
                  ? colors.btnPrimary
                  : colors.inputplaceholder,
              width: '100%',
              borderRadius: 12,
              padding: 16,
              backgroundColor:
                item.varient === 'solid' ? colors.btnPrimary : 'transparent',
            }}>
            <Typography
              color={
                item.varient === 'solid' ? colors.white : colors.primaryText
              }
              fontSize={15}
              style={{textAlign: 'center'}}>
              {item.title}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </AuthLayoutContainer>
  );
};

export default Welcome;
