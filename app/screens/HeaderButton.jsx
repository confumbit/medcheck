import React from "react";
import { TouchableNativeFeedback, View, Image, StyleSheet } from "react-native";

export default function HeaderButton({ navigation, name, image }) {
  return (
    <TouchableNativeFeedback onPress={() => navigation.navigate(name)}>
      <View style={styles.iconContainer}>
        <Image source={image} style={styles.icon} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 31,
    width: 31,
  },
});
