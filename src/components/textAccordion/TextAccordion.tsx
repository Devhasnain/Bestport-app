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
      </Text>
      {isLongText && !expanded ? (
          <Text onPress={() => setExpanded(!expanded)} style={[styles.btnText]}>
            {readMoreText}
          </Text>
        ) : (
          <></>
        )}
      {expanded && (
        <Text onPress={() => setExpanded(!expanded)} style={[styles.btnText]}>
          {readLessText}
        </Text>
      )}
    </View>
  );
};

export default memo(TextAccordion);
