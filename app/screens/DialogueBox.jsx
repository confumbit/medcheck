import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

export default function DialogueBox({ names, display }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderRadius: 30,
      elevation: 30,
      padding: 50,
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "40%",
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ff4238",
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

  if (names.length === 0) return null;

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={{ color: colors.text, fontSize: 18, textAlign: "center" }}>
          You are short on: {"\n\n"}
          {names.join("\n")}
          {"\n"}
        </Text>
        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={() => setShorts()}>
              Ignore
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={{ height: 20 }}></View>
        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Request Order</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
