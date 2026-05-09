import colors from '@/config/Colors';
import React, { memo } from 'react';

import { View, TextInput, Feather } from '../index';
import styles from './SearchBar.style';


type Props = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
};

export const SearchBar = memo(({
  value = '',
  setValue = () => {},
  placeholder = 'Search',
}: Props) => {
  return (
    <View style={[styles.container]}>
      <Feather name="search" color={colors.inputplaceholder} size={22} />
      <TextInput
        style={styles.searchInput}
        placeholderTextColor={colors.inputplaceholder}
        placeholder={placeholder}
        cursorColor={colors.primaryTextLight}
        value={value}
        onChangeText={e => setValue(e)}
      />
    </View>
  );
});