import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableNativeFeedback, Text, View, StyleSheet } from "react-native";

export default function Button({ name, onPress }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      width: "80%",
      height: 60,
      shadowColor: "black",
      shadowRadius: 15,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      elevation: 10,
      top: "9%",
    },
    buttonText: {
      color: colors.card,
      fontSize: 18,
    },
  });

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
