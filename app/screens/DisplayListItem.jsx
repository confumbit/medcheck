import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native";

export default function DisplayListItem({ navigation, item, shorts }) {
  const { colors } = useTheme();

  console.log({ shorts });

  const styles = StyleSheet.create({
    itemView: {
      width: "100%",
      height: 57,
      backgroundColor: colors.card,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: "7.5%",
      marginVertical: 1.3,
    },
    itemText: {
      color: shorts.filter((x) => x === item.name).length
        ? "#ff3838"
        : colors.text,
      fontSize: 20,
    },
  });
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("Edit", { item })}
      key={item.name}
    >
      <View style={styles.itemView}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>
          {item.quantity -
            item.breakfastCheck -
            item.lunchCheck -
            item.dinnerCheck}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}
