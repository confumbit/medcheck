import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function SwitchInput({ name, value, onValueChange }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    switchView: {
      flexDirection: "row",
      width: "85%",
      height: 65,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.switchView} key={name}>
      <Text style={{ fontSize: 18, color: colors.text }}>
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: colors.primary }}
        thumbColor="#f4f3f4"
        style={{
          transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        }}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}
