import InputErrorMessage from '@components/ui/input/InputErrorMessage';
import Typography from '@components/ui/Typography';
import { View, TextInput } from 'react-native';
import React, { memo } from 'react';
import colors from '@config/Colors';
import { isIOS } from '@rneui/base';
import fonts from '@config/Fonts';


type Props = {
  value:string;
  error:any;
  onChange:any;
  label?:string
}

const PhoneNumInput = ({label="Contact Number",value = '', onChange, error = ''}:Props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography
      fontFamily={fonts.poppinsMedium}
      color={colors.primaryTextLight}
      fontSize={13.5}
      style={{
        fontWeight:"600",
        marginBottom:1
      }}
      >
        {label}
      </Typography>
      <View
        style={[
          {
            borderWidth: isIOS ? 1: 1.5,
            borderRadius: 12,
            borderColor: colors.inputBorder,
            backgroundColor: colors.btnSecondary,
            borderBottomWidth: isIOS ? 1.2: 1.5,
            minHeight: 50,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
          error ? {borderColor: 'red', marginBottom: -3} : {},
        ]}>
        <Typography
          style={{
            paddingLeft: 10,
            paddingRight: 6,
            textAlign: 'center',
          }}
          fontSize={15}
          fontFamily={fonts.poppinsMedium}
          color={colors.inputplaceholder}>
          +44
        </Typography>
        <TextInput
          inputMode="numeric"
          numberOfLines={1}
          value={value}
          onChangeText={onChange}
          style={{
            flex: 1,
            paddingBottom: isIOS ? 0: 6,
            fontFamily: fonts.poppinsRegular,
            fontSize: 14.5,
            color: colors.primaryText,
          }}
          placeholder="00 000 000 000"
          placeholderTextColor={colors.primaryTextLight}
          cursorColor={colors.primaryTextLight}
        />
      </View>
      {error && <InputErrorMessage error={error} />}
    </View>
  );
};
export default memo(PhoneNumInput);
