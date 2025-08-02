import React, { memo, useMemo, useState } from 'react';
import { Text, TextStyle, View } from 'react-native';

import styles from './TextAccordion.style';


type Props = {
  text: string;
  readMoreText?: string;
  readLessText?: string;
  textStyle?: TextStyle;
  charLimit: number;
};

const TextAccordion = ({
  text = '',
  charLimit = 100,
  readMoreText = 'Read more',
  readLessText = 'Read less',
  textStyle = {},
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const isLongText = text.length > charLimit;
  const displayText = useMemo(
    () => (expanded || !isLongText ? text : text.slice(0, charLimit) + '...'),
    [expanded, isLongText],
  );

  return (
    <View>
      <Text style={[styles.reviewText, textStyle]}>
        {displayText}
        {isLongText && (
          <Text onPress={() => setExpanded(!expanded)} style={[styles.btnText]}>
          {expanded ? ` ${readLessText}` : `${readMoreText}`}
          </Text>
        )}
      </Text>
    </View>
  );
};

export default memo(TextAccordion);
