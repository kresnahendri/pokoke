import React from "react";
import {Text} from "react-native";

import Container from "../components/Container";
import {useGetPokeDetail} from "../hooks/http/poke/useGetPokeDetail";
import {
  PokeDetailNavigation,
  PokeDetailRoute,
} from "../navigations/NavigationProps";

interface Props {
  route: PokeDetailRoute;
  navigation: PokeDetailNavigation;
}

const PokeDetailScreen: React.FC<Props> = ({route}) => {
  const {data} = useGetPokeDetail({name: route.params.name});

  // TODO: use as component's data provider
  console.log(data);

  return (
    <Container>
      <Text>PokeDetail</Text>
    </Container>
  );
};

export default PokeDetailScreen;
