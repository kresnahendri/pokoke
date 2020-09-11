import React from "react";
import {Button, Text} from "react-native";

import {useGetPokeList} from "../hooks/http/poke/useGetPokeList";
import {useGetPokeTypeList} from "../hooks/http/poke/useGetPokeTypeList";
import {
  PokeListNavigation,
  PokeListRoute,
} from "../navigations/NavigationProps";

interface Props {
  route: PokeListRoute;
  navigation: PokeListNavigation;
}

const PokeListScreen: React.FC<Props> = ({navigation}) => {
  const pokeType = useGetPokeTypeList();
  const pokeList = useGetPokeList();

  // TODO: use as component's data provider
  console.log(pokeType);
  console.log(pokeList);

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
