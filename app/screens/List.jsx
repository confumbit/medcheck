import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";

import InteractiveListItem from "./InteractiveListItem";
import ListHeader from "./ListHeader";
import AddButton from "./AddButton";

export default function List({
  navigation,
  medicines,
  deleteItem,
  checkItem,
  checkMultipleItems,
  route,
}) {
  const { listName } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: listName + " Medicine" });
  }, []);

  const beforeItems = medicines
    .filter(
      (item) =>
        item.afterfood === 0 &&
        item[listName.slice(0, 1).toLowerCase() + listName.slice(1)] === 1
    )
    .map((item) => (
      <InteractiveListItem
        item={item}
        key={item.name}
        name={item.name}
        navigation={navigation}
        listName={listName}
        deleteItem={deleteItem}
        checkItem={checkItem}
      />
    ));

  const afterItems = medicines
    .filter(
      (item) =>
        item.afterfood === 1 &&
        item[listName.slice(0, 1).toLowerCase() + listName.slice(1)] === 1
    )
    .map((item) => (
      <InteractiveListItem
        item={item}
        key={item.name}
        name={item.name}
        navigation={navigation}
        listName={listName}
        deleteItem={deleteItem}
        checkItem={checkItem}
      />
    ));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <ListHeader
          onClick={(val) => checkMultipleItems(val, listName, 0)}
          title="Before Food"
        />
        <View>{beforeItems}</View>
        <ListHeader
          onClick={(val) => checkMultipleItems(val, listName, 1)}
          title="After Food"
        />
        <View>{afterItems}</View>
      </ScrollView>
      <AddButton navigation={navigation} />
    </View>
  );
}
