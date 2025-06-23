import {
  AppFlatlist,
  BackgroundImgContainer,
  Header,
  SearchBar,
  FontAwesome,
  Typography,
} from '@components/index';
import React, {useCallback, useState} from 'react';

import styles from './Faqs.style';
import colors from '@config/Colors';
import {faqs} from '@config/Constants';
import {TouchableOpacity, View} from 'react-native';

const Faqs = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const filtereFaqs = (item: any) => {
    if (search?.trim()?.length)
      if (item?.q?.toLowerCase()?.includes(search?.toLowerCase())) {
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
        <View>
          <Typography>{item?.title}</Typography>
          <FontAwesome
            name={activeTab === index ? 'angle-up' : 'angle-down'}
            size={22}
            color={colors.primaryTextLight}
          />
        </View>
        {activeTab === index && <Typography>{item.description}</Typography>}
      </TouchableOpacity>
    ),
    [activeTab],
  );

  return (
    <BackgroundImgContainer>
      <Header title="Faqs" leftIcon />
      <SearchBar value={search} setValue={setSearch} placeholder="Search faq" />
      <AppFlatlist
        data={faqs.filter(filtereFaqs)}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />
    </BackgroundImgContainer>
  );
};

export default Faqs;
