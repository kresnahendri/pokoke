import "react-native-gesture-handler";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";

import PokeDetailScreen from "../screens/PokeDetailScreen";
import PokeListScreen from "../screens/PokeListScreen";

const PokeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen name="PokeList" component={PokeListScreen} />
      <Stack.Screen name="PokeDetail" component={PokeDetailScreen} />
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
