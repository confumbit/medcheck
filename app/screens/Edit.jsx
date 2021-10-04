import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Switch, Text } from "react-native";

import SwitchInput from "./SwitchInput";
import Button from "./FormButton";
import NumberInput from "./NumberInput";

export default function Edit({ route, navigation, editItem }) {
  const { colors } = useTheme();
  const { item } = route.params;
  const [itemName, setItemName] = useState(item.name);
  const [critical, setCritical] = useState(item.critical);
  const [quantity, setQuantity] = useState(
    item.quantity - item.breakfastCheck - item.lunchCheck - item.dinnerCheck
  );
  const [afterfood, setAfterfood] = useState(item.afterfood ? true : false);
  const [times, setTimes] = useState({
    breakfast: item.breakfast ? true : false,
    lunch: item.lunch ? true : false,
    dinner: item.dinner ? true : false,
  });

  const onPress = () => {
    editItem([
      itemName,
      parseInt(quantity) +
        parseInt(item.breakfastCheck) +
        parseInt(item.lunchCheck) +
        parseInt(item.dinnerCheck),
      critical,
      afterfood,
      times.breakfast,
      times.lunch,
      times.dinner,
      item.name,
    ]);
    navigation.goBack();
  };

  const numberInputs = [
    {
      label: "Quantity",
      sublabel: "The number of tablets you currently have.",
      defaultValue: quantity.toString(),
      onChangeText: (text) => setQuantity(text),
    },
    {
      label: "Alert Quantity",
      sublabel: "The threshold quantity to give an alert.",
      defaultValue: critical.toString(),
      onChangeText: (text) => setCritical(text),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      alignItems: "center",
    },
    input: {
      backgroundColor: colors.card,
      width: "85%",
      height: 64,
      color: colors.text,
      fontSize: 24,
      padding: 8,
      paddingLeft: 15,
      marginBottom: 50,
      borderBottomWidth: 4,
      borderBottomColor: colors.text,
      borderRadius: 5,
    },
    switchView: {
      flexDirection: "row",
      width: "85%",
      height: 65,
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        defaultValue={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <View
        style={{
          marginBottom: 30,
          width: "100%",
          alignItems: "center",
        }}
      >
        {numberInputs.map((input) => (
          <NumberInput
            label={input.label}
            key={input.label}
            sublabel={input.sublabel}
            defaultValue={input.defaultValue}
            onChangeText={input.onChangeText}
          />
        ))}
        {["breakfast", "lunch", "dinner"].map((time) => (
          <SwitchInput
            name={time}
            key={time}
            value={times[time]}
            onValueChange={() => setTimes((c) => ({ ...c, [time]: !c[time] }))}
          />
        ))}
        <View style={{ ...styles.switchView, marginTop: 20 }} key="after">
          <Text style={{ fontSize: 18, color: colors.text }}>Before Food</Text>
          <Switch
            trackColor={{ false: "#ff3838", true: "#ff3838" }}
            thumbColor="#f4f3f4"
            style={{
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            }}
            value={afterfood}
            onValueChange={() => setAfterfood((c) => !c)}
          />
          <Text style={{ fontSize: 18, color: colors.text }}>After Food</Text>
        </View>
      </View>
      <Button name="Save Changes" onPress={onPress} />
    </View>
  );
}
