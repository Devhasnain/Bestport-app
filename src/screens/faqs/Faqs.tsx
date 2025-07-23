import { AppFlatlist, Header, SearchBar, FontAwesome, Typography, } from '@components/index';
import { TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { faqs } from '@config/Constants';
import colors from '@config/Colors';
import fonts from '@config/Fonts';

import styles from './Faqs.style';


const Faqs = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const filtereFaqs = (item: any) => {
    if (search?.trim()?.length)
      if (item?.title?.toLowerCase()?.includes(search?.toLowerCase())) {
        return true;
      } else return false;
    else return true;
  };

  const renderItem = useCallback(
    ({item, index}: any) => (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => setActiveTab(index)}
        style={styles.cardContainer}>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <Typography fontFamily={fonts.poppinsMedium} fontSize={15} style={{width:"80%"}}>{item?.title}</Typography>
          <FontAwesome
            name={activeTab === index ? 'angle-up' : 'angle-down'}
            size={22}
            color={colors.primaryTextLight}
          />
        </View>
        {activeTab === index && <Typography fontSize={14}>{item?.description}</Typography>}
      </TouchableOpacity>
    ),
    [activeTab],
  );

  return (
    <>
      <Header title="Faqs" leftIcon />
      <SearchBar value={search} setValue={setSearch} placeholder="Search faq" />
      <AppFlatlist
      paddingBottom={20}
        data={faqs.filter(filtereFaqs)}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />
    </>
  );
};

export default Faqs;
