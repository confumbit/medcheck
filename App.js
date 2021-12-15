import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";
import * as Linking from "expo-linking";

import Home from "./app/screens/Home";
import List from "./app/screens/List";
import Edit from "./app/screens/Edit";
import Add from "./app/screens/Add";
import Settings from "./app/screens/Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  const [medicines, setMedicines] = useState();
  const [config, setConfig] = useState();
  const [shorts, setShorts] = useState();
  const alerted = useRef(false);

  useEffect(() => {
    const db = SQLite.openDatabase("medcheck.db");

    // Run startup checks
    // Create tables
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS medicines 
        (name TEXT NOT NULL PRIMARY KEY, quantity INTEGER, critical INTEGER,
          afterfood INTEGER, breakfast INTEGER, lunch INTEGER, dinner INTEGER)`,
        [],
        (txn, res) => {
          console.log("Verified medicines table.");
        },
        (err) => console.log(err)
      );
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS checklist 
        (name TEXT NOT NULL PRIMARY KEY, breakfastCheck INTEGER,
           lunchCheck INTEGER, dinnerCheck INTEGER)`,
        [],
        (txn, res) => {
          console.log("Verified checklist table.");
        },
        (err) => console.log(err)
      );
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS config (theme INTEGER, lastOpened INTEGER, phone TEXT)",
        [],
        (txn, res) => {
          console.log("Verified config table.");
        },
        (err) => console.log(err)
      );
    });

    // Initialize config and update medicine quantities
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM config",
        [],
        (txn, { rows: { _array } }) => {
          console.log(_array);
          if (_array.length === 0) {
            txn.executeSql(
              `INSERT INTO config VALUES (0, ?, 919248020161)`,
              [new Date().getDate()],
              (txn, res) => {
                console.log("Initialized config table.");
              },
              (err) => console.log(err)
            );
          } else if (_array[0].lastOpened !== new Date().getDate()) {
            txn.executeSql(
              `UPDATE config SET lastOpened=?`,
              [new Date().getDate()],
              (txn, res) => {
                console.log("Updated lastOpened in config table.");
              },
              (err) => console.log(err)
            );
            txn.executeSql(
              "UPDATE medicines \
              SET quantity=quantity\
              -(select breakfastCheck from checklist where checklist.name=medicines.name)\
              -(select lunchCheck from checklist where checklist.name=medicines.name)\
              -(select dinnerCheck from checklist where checklist.name=medicines.name)",
              [],
              (txn, res) => {
                console.log(
                  "Updated quantites of stock based on the previous day's checks."
                );
                getItems();
                checkCritical();
              },
              (err) => console.log(err)
            );
            txn.executeSql(
              `UPDATE checklist SET breakfastCheck=0, lunchCheck=0, dinnerCheck=0`,
              [],
              (txn, res) => {
                console.log("Cleared all medicine checks.");
              },
              (err) => console.log(err)
            );
          }
        },
        (err) => console.log(err)
      );
    });
    getItems();
    getConfig();
    checkCritical();
    options = {
      headerTintColor: (config ? config.theme : false) ? "#2c3e50" : "#ffffff",
      headerStyle: {
        backgroundColor: (config ? config.theme : false)
          ? "#f8f8f8"
          : "#1e1e1e",
      },
    };
  }, []);

  const getItems = () => {
    // Retrieve medicine list from db
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM medicines, checklist where medicines.name=checklist.name",
        [],
        (txn, { rows: { _array } }) => {
          console.log(_array);
          setMedicines(_array);
        },
        (err) => console.log(err)
      );
    });
  };

  const insertItem = (arr) => {
    const db = SQLite.openDatabase("medcheck.db");
    // Insert new medicine row
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO medicines VALUES (?,?,?,?,?,?,?)",
        arr,
        (txn, res) => {
          console.log("Row added to medicines table.");
        },
        (err) => console.log(err)
      );
      txn.executeSql(
        "INSERT INTO checklist VALUES (?,0,0,0)",
        [arr[0]],
        (txn, res) => {
          console.log("Row added to checklist table.");
        },
        (err) => console.log(err)
      );
    });
    getItems();
  };

  const deleteItem = (name) => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        "DELETE FROM medicines WHERE name=?",
        [name],
        (txn, res) => {
          console.log(`${name} row deleted from medicines.`);
        },
        (err) => console.log(err)
      );
      txn.executeSql(
        "DELETE FROM checklist WHERE name=?",
        [name],
        (txn, res) => {
          console.log(`${name} row deleted from checklist.`);
        },
        (err) => console.log(err)
      );
    });
    getItems();
  };

  const checkItem = (value, name, listName) => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        `UPDATE checklist SET ${
          listName.toLowerCase() + "Check"
        }=? WHERE name=?`,
        [value, name],
        (txn, res) => {
          console.log(`Updated row in checklist, Changed ${name} to ${value}`);
        },
        (err) => console.log(err)
      );
    });
    checkCritical();
    getItems();
  };

  const checkMultipleItems = (value, listName, afterfood) => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        `UPDATE checklist \
        SET ${listName.toLowerCase() + "Check"}=? \
        WHERE EXISTS(SELECT * FROM medicines WHERE medicines.name=checklist.name) \
        AND (SELECT afterfood FROM medicines WHERE medicines.name=checklist.name)=? \
        AND (SELECT ${listName.toLowerCase()} FROM medicines WHERE medicines.name=checklist.name)=1
        `,
        [value, afterfood],
        (txn, res) => {
          console.log(
            `Updated row in checklist, Changed ${listName} ${afterfood} to ${value}`
          );
        },
        (err) => console.log(err)
      );
    });
    getItems();
  };

  const editItem = (arr) => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        "UPDATE medicines SET name=?, quantity=?, critical=?, afterfood=?, breakfast=?, lunch=?, dinner=? WHERE name=?",
        arr,
        (txn, res) => {
          console.log("Row updated in medicines table.");
        },
        (err) => console.log(err)
      );
    });
    getItems();
  };

  const getConfig = () => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM config",
        [],
        (txn, res) => {
          console.log(res.rows._array[0]);
          setConfig(res.rows._array[0]);
        },
        (err) => console.log(err)
      );
    });
  };

  const toggleDarkMode = (darkEnabled) => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        "UPDATE config SET theme=?",
        [!darkEnabled],
        (txn, res) => {
          console.log(`darkmode is now changed to ${!darkEnabled}`);
        },
        (err) => console.log(err)
      );
    });
    getConfig();
  };

  const checkCritical = () => {
    const db = SQLite.openDatabase("medcheck.db");
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM medicines \
        WHERE quantity\
        -(select breakfastCheck from checklist where checklist.name=medicines.name)\
        -(select lunchCheck from checklist where checklist.name=medicines.name)\
        -(select dinnerCheck from checklist where checklist.name=medicines.name)\
        <= critical",
        [],
        (txn, { rows: { _array } }) => {
          console.log(_array);
          console.log(_array.map((x) => x.name));
          setShorts(_array.map((x) => x.name));
        },
        (err) => console.log(err)
      );
    });
  };

  const alertOk = (v, text = "") => {
    if (v) {
      Linking.openURL(`https://wa.me/${config.phone}?text=${text}`);
    }
    alerted.current = true;
  };

  const lightTheme = {
    dark: false,
    colors: {
      primary: "#ff3838",
      text: "#121212",
      card: "#ffffff",
      background: "#f8f8f8",
      border: "#ff3838",
      notification: "#ff3838",
    },
  };

  const darkTheme = {
    dark: true,
    colors: {
      primary: "#ff3838",
      text: "#ffffff",
      card: "#121212",
      background: "#1e1e1e",
      border: "#ff3838",
      notification: "#ff3838",
    },
  };
  let options = {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: (config ? config.theme : false)
          ? darkTheme.colors.background
          : lightTheme.colors.background,
      }}
    >
      <NavigationContainer
        theme={(config ? config.theme : false) ? darkTheme : lightTheme}
      >
        {(shorts ? shorts.length && !alerted.current : false)
          ? Alert.alert(
              "Shortage",
              `You have a shortage of ${shorts.join(
                ", "
              )}. Do you want to place an order?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => alertOk(false),
                },
                {
                  text: "OK",
                  onPress: () => alertOk(true, shorts.join(",")),
                },
              ]
            )
          : null}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={options} />
          <Stack.Screen name="List" options={options}>
            {(props) => (
              <List
                {...props}
                medicines={medicines}
                deleteItem={deleteItem}
                checkItem={checkItem}
                checkMultipleItems={checkMultipleItems}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Edit"
            options={{ ...options, title: "Edit Item" }}
          >
            {(props) => <Edit {...props} editItem={editItem} />}
          </Stack.Screen>
          <Stack.Screen name="Add" options={{ ...options, title: "Add Item" }}>
            {(props) => <Add {...props} insertItem={insertItem} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={options}>
            {(props) => (
              <Settings
                {...props}
                medicines={medicines}
                config={config}
                shorts={shorts}
                toggleDarkMode={toggleDarkMode}
                alertOk={alertOk}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
