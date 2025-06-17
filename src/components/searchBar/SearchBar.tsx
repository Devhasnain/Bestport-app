import Feather from 'react-native-vector-icons/Feather';
import {View, TextInput} from 'react-native';
import React from 'react';
import styles from './SearchBar.style';
import colors from '@config/Colors';

type Props = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  value = '',
  setValue = () => {},
  placeholder = 'Search',
}: Props) => {
  return (
    <View style={[styles.container]}>
      <Feather name="search" color={colors.primaryTextLight} size={22} />
      <TextInput
        style={styles.searchInput}
        placeholderTextColor={colors.primaryTextLight}
        placeholder={placeholder}
        cursorColor={colors.primaryTextLight}
        value={value}
        onChangeText={e => setValue(e)}
      />
    </View>
  );
};

export default React.memo(SearchBar);
