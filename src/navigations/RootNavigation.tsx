import "react-native-gesture-handler";

import {NavigationContainer} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";

import AppBar from "../components/AppBar";
import Colors from "../constants/Colors";
import PokeDetailScreen from "../screens/PokeDetailScreen";
import PokeListScreen from "../screens/PokeListScreen";

const PokeStack = () => {
  const defaultOptions: StackNavigationOptions = {
    headerStatusBarHeight: 0,
    headerStyle: {
      backgroundColor: Colors.primary,
      height: 50,
    },
    headerTintColor: "white",
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="PokeList"
        component={PokeListScreen}
        options={{
          ...defaultOptions,
          headerTitle: () => <AppBar />,
        }}
      />
      <Stack.Screen
        name="PokeDetail"
        component={PokeDetailScreen}
        options={{
          ...defaultOptions,
          headerBackTitle: "Back",
          headerTitleStyle: {
            textTransform: "capitalize",
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <PokeStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
