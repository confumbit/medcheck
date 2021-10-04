import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";

import AddButton from "./AddButton";
import HeaderButton from "./HeaderButton";
import ListName from "./ListName";
import settingsLight from "../assets/settings-light.png";
import settingsDark from "../assets/settings-dark.png";

export default function Home({ navigation }) {
  const { colors } = useTheme();
  const settingsImg = { "#ffffff": settingsLight, "#121212": settingsDark };

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.text,
      headerStyle: {
        backgroundColor: colors.card,
      },
      headerRight: () => (
        <HeaderButton
          navigation={navigation}
          name="Settings"
          image={settingsImg[colors.text]}
        />
      ),
    });
  }, [navigation, colors]);

  const lists = [
    {
      name: "Breakfast",
      color: "#27bba7",
      align: "flex-start",
    },
    {
      name: "Lunch",
      color: "#ca782a",
      align: "flex-end",
    },
    {
      name: "Dinner",
      color: "#115ba0",
      align: "flex-start",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      {lists.map((list) => (
        <ListName
          navigation={navigation}
          key={list.name}
          name={list.name}
          color={list.color}
          align={list.align}
        />
      ))}
      <AddButton navigation={navigation} />
    </View>
  );
}
