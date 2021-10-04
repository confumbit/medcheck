import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, Text, Switch, ScrollView } from "react-native";

import FormButton from "./FormButton";
import DisplayListItem from "./DisplayListItem";

export default function Settings({
  navigation,
  medicines,
  config,
  shorts,
  toggleDarkMode,
  alertOk,
}) {
  const { colors } = useTheme();
  const [darkEnabled, setDarkEnabled] = useState(config.theme ? true : false);

  const styles = StyleSheet.create({
    title: {
      color: colors.primary,
      fontWeight: "bold",
      marginLeft: 25,
      marginTop: 30,
    },
    switchView: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 20,
      marginVertical: 30,
    },
    labelView: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 25,
      marginTop: 30,
      marginBottom: 20,
    },
    labelStyle: { fontWeight: "bold", color: colors.primary },
    buttonView: {
      paddingTop: 50,
      paddingBottom: 100,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.title}>THEME</Text>
      <View style={styles.switchView}>
        <Text style={{ fontSize: 18, color: colors.text }}>Light</Text>
        <Switch
          trackColor={{ false: "#121212", true: "#ffffff" }}
          thumbColor={darkEnabled ? "#121212" : "#ffffff"}
          style={{
            transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
          }}
          value={darkEnabled}
          onValueChange={() => {
            toggleDarkMode(darkEnabled);
            setDarkEnabled((c) => !c);
          }}
        />
        <Text style={{ fontSize: 18, color: colors.text }}>Dark</Text>
      </View>
      <View style={styles.labelView}>
        <Text style={styles.labelStyle}>MEDICINE</Text>
        <Text style={styles.labelStyle}>QUANTITY</Text>
      </View>
      {medicines.map((item) => (
        <DisplayListItem
          navigation={navigation}
          item={item}
          key={item.name}
          shorts={shorts}
        />
      ))}
      <View style={styles.buttonView}>
        {shorts.length ? (
          <FormButton
            name="Request Order"
            onPress={() => alertOk(true, shorts.join(","))}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}
