import React from "react";
import { Button, View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FetchStudents from "./components/FetchStudents";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Fetch Students"
        onPress={() => navigation.navigate("FetchStudents")}
      />
      <Button
        title="Add Student"
        onPress={() => navigation.navigate("AddStudent")}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FetchStudents" component={FetchStudents} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="UpdateStudent" component={UpdateStudent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20, // Adds space between buttons
  },
});

export default App;
