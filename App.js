import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import List from "./app/screens/List";
import Edit from "./app/screens/Edit";
import Add from "./app/screens/Add";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App rendered.");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{ title: "Edit Item" }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{ title: "Add Item" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
