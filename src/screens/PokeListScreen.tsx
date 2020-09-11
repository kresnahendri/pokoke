import React from "react";
import {ActivityIndicator, ListRenderItemInfo, View} from "react-native";
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";

import Container from "../components/Container";
import PokeCardContainer from "../containers/PokeCardContainer";
import {Pokemon} from "../hooks/http/poke/pokeModels";
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

  const shouldRenderLoader =
    pokeList.isLoading || pokeList.isFetchingMore || pokeList.isFetching;

  const renderItem = ({item: pokemon}: ListRenderItemInfo<Pokemon>) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PokeDetail", {name: pokemon.name});
        }}>
        <PokeCardContainer name={pokemon.name} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Container>
      {pokeList.data && (
        <FlatList
          data={pokeList.data.flatMap((x) => x.results)}
          renderItem={renderItem}
          keyExtractor={(item) => item.name + item.url}
          onEndReachedThreshold={0.5}
          onEndReached={() => pokeList.fetchMore()}
          ListFooterComponent={() =>
            shouldRenderLoader ? (
              <ActivityIndicator style={{paddingVertical: 16}} />
            ) : (
              <View />
            )
          }
          refreshing={pokeList.isLoading}
          onRefresh={() => {
            if (pokeList.refetch) {
              pokeList.refetch();
            }
          }}
        />
      )}
    </Container>
  );
};

export default PokeListScreen;
