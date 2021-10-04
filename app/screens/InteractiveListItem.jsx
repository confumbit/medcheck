import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import editLight from "../assets/edit-light.png";
import editDark from "../assets/edit-dark.png";
import deleteLight from "../assets/delete-light.png";
import deleteDark from "../assets/delete-dark.png";

export default function ListItem({
  item,
  navigation,
  listName,
  deleteItem,
  checkItem,
}) {
  const editImg = { "#ffffff": editLight, "#121212": editDark };
  const deleteImg = { "#121212": deleteDark, "#ffffff": deleteLight };
  const { colors } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [style, setStyle] = useState({
    color: colors.text,
    fontSize: 20,
    textDecorationLine: "none",
  });
  let checkboxRef = useRef();

  useEffect(() => {
    if (item[listName.toLowerCase() + "Check"] && !isChecked) {
      check(true);
    }
    if (!item[listName.toLowerCase() + "Check"] && isChecked) {
      check(false);
    }
  }, [item[listName.toLowerCase() + "Check"]]);

  const check = (value) => {
    checkItem(value, item.name, listName);
    setStyle((c) => ({
      ...c,
      textDecorationLine: value ? "line-through" : "none",
    }));
    setIsChecked(value);
  };

  const styles = StyleSheet.create({
    item: {
      width: "100%",
      height: 57,
      backgroundColor: colors.card,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      marginVertical: 1.3,
    },
    itemName: {
      paddingLeft: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 30,
      height: 30,
    },
    actions: {
      width: "23%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    action: {
      padding: 10,
    },
  });

  return (
    <TouchableNativeFeedback onPress={() => checkboxRef.current.onPress()}>
      <View style={styles.item}>
        <View style={styles.itemName}>
          <BouncyCheckbox
            ref={checkboxRef}
            size={25}
            fillColor={colors.primary}
            disableBuiltInState={true}
            isChecked={isChecked}
            onPress={() => check(!isChecked)}
          />
          <Text style={style}>{item.name}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("Edit", { item })}
          >
            <View style={styles.action}>
              <Image source={editImg[colors.text]} style={styles.image} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => deleteItem(item.name)}>
            <View style={styles.action}>
              <Image source={deleteImg[colors.text]} style={styles.image} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
