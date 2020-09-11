import React from "react";
import {Button, Text} from "react-native";

import {
  PokeListNavigation,
  PokeListRoute,
} from "../navigations/NavigationProps";

interface Props {
  route: PokeListRoute;
  navigation: PokeListNavigation;
}

const PokeListScreen: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <Text>PokeList</Text>
      <Button
        onPress={() => navigation.navigate("PokeDetail", {name: "dummy_name"})}
        title="GoToPokeDetailScreen"
      />
    </>
  );
};

export default PokeListScreen;
