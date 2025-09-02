import { View, StyleSheet, Animated, Dimensions, Image, } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { isAlertExists } from "@store/authSlice";
import { useSelector } from "react-redux";
import images from "@config/Images";
import fonts from "@config/Fonts";

import Typography from "./ui/Typography";


const { width } = Dimensions.get("window");

const alertColors:any = Object.freeze({
  success: "#e3fae8",
  error: "#fff1f0",
  warning: "#faf5e3",
});

const alertIcons:any = Object.freeze({
  success: images.successIcon,
  error: images.errorIcon,
  warning: images.warning,
});

const CustomAlert = () => {
  const alert = 
  // {
  //   type:"success",
  //   title:"If the model name",
  //   message:"If the model name or If the model name or If the model name or "
  // }
  useSelector(isAlertExists);
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert?.type && alert?.message) {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (visible) {
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setVisible(false);
      });
    }
    // 👇 removed slideAnim from deps (it's stable)
  }, [alert, visible]);

  if (!visible) return null;

  const bgColor = alert?.type ? alertColors[alert.type] : "white";
  const icon = alert?.type ? alertIcons[alert.type] : null;

  return (
    <Animated.View
      style={[
        styles.container,
        styles.activeAlert,
        { backgroundColor: bgColor, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <View style={styles.textWrapper}>
        {alert?.title && (
          <Typography fontSize={15} fontFamily={fonts.poppinsMedium}>
            {alert.title}
          </Typography>
        )}
        {alert?.message && (
          <Typography fontSize={13} lineHeight={18}>
            {alert.message}
          </Typography>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    width: width * 0.9,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    zIndex: 9999,
    flexDirection: "row",
  },
  activeAlert: {
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
    resizeMode: "contain",
  },
  textWrapper: {
    flexShrink: 1,
    width: "90%",
  },
});

export default memo(CustomAlert);
