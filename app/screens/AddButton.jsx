import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native";

export default function AddButton({ navigation }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    addItem: {
      position: "absolute",
      bottom: 30,
      right: 30,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      width: 60,
      height: 60,
      elevation: 2,
    },
    plus: {
      color: colors.background,
      fontSize: 36,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableNativeFeedback onPress={() => navigation.navigate("Add")}>
      <View style={styles.addItem}>
        <Text style={styles.plus}>+</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
