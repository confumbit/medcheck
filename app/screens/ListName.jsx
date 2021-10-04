import React from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native";

export default function ListName({ navigation, name, color, align }) {
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("List", { listName: name })}
    >
      <View
        style={{
          ...styles.listNameContainer,
          borderColor: color,
          alignItems: align,
        }}
      >
        <Text style={{ ...styles.listName, color }}>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  listNameContainer: {
    flex: 1,
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    width: "96%",
    justifyContent: "center",
    borderWidth: 5,
    marginVertical: 5,
    marginHorizontal: "2%",
  },
  listName: {
    flex: 1,
    fontSize: 64,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: { width: 0, height: 0 },
  },
});
