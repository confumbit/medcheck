import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ListHeader({ onClick, title }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    headerContainer: {
      width: "70%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      paddingLeft: 20,
      paddingTop: 20,
      paddingBottom: 5,
      color: colors.primary,
    },
    hr: {
      width: "70%",
      borderRadius: 50,
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
      marginBottom: 10,
    },
  });

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{title}</Text>
        <BouncyCheckbox
          size={25}
          fillColor={colors.primary}
          style={{ top: 10 }}
          onPress={(e) => onClick(e)}
        />
      </View>
      <View style={styles.hr} />
    </View>
  );
}
