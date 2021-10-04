import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function NumberInput({
  label,
  sublabel,
  defaultValue,
  onChangeText,
}) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    metaNumberView: {
      width: "85%",
      height: 90,
      justifyContent: "center",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    numberView: {
      flexDirection: "row",
      width: "100%",
      height: 70,
      justifyContent: "space-between",
      alignItems: "center",
    },
    number: {
      backgroundColor: colors.card,
      width: "20%",
      height: 64,
      color: colors.text,
      fontSize: 24,
      padding: 8,
      paddingLeft: 15,
      borderBottomWidth: 4,
      borderBottomColor: colors.text,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.metaNumberView}>
      <View style={styles.numberView}>
        <Text style={{ fontSize: 18, color: colors.text }}>{label}</Text>
        <TextInput
          style={styles.number}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          keyboardType="number-pad"
        />
      </View>
      <Text style={{ fontSize: 12, bottom: 20, color: colors.text }}>{sublabel}</Text>
    </View>
  );
}
