import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@components/index";
import React, { memo, useState } from "react";


const RatingStars = ({ onChange }:any) => {
  const [rating, setRating] = useState(1); // Min rating is 1

  const handlePress = (value:any) => {
    const newRating = value < 1 ? 1 : value; // Ensure minimum is 1
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => handlePress(value)}
          activeOpacity={0.7}
        >
          <FontAwesome
            name={value <= rating ? "star" : "star-o"}
            size={32}
            color={value <= rating ? "#FFD700" : "#C0C0C0"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    gap:10
  },
});

export default memo(RatingStars);
