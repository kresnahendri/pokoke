import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";

import EmptyResult from "../components/EmptyResult";
import PokeCard from "../components/PokeCard";
import {useScrollTreshold} from "../hooks/dom/useScrollTreshold";
import {GetPokeDetailResponse} from "../hooks/http/poke/pokeModels";
import {useGetPokeList} from "../hooks/http/poke/useGetPokeList";
import {PokeListNavigation} from "../navigations/NavigationProps";

const isWeb = Platform.OS === "web";

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: isWeb ? "row" : "column",
    flexWrap: isWeb ? "wrap" : "nowrap",
    justifyContent: "center",
  },
});

interface Props {
  type_: string;
  navigation: PokeListNavigation;
}

const PokeListContainer: React.FC<Props> = ({type_, navigation}) => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingMore,
    refetch,
    fetchMore,
  } = useGetPokeList({
    type_,
    limit: 12,
    offset: 0,
  });
  const [isWide, setIsWide] = useState(true);
  const {isTresholdReached, reset: resetScrollDetector} = useScrollTreshold(
    200,
  );

  const flattenData = data?.flatMap((x) => x);
  const shouldRenderLoader = isLoading || isFetchingMore || isFetching;

  useEffect(() => {
    refetch();
  }, [type_]);

  useEffect(() => {
    const isAllowToFetchMore =
      isTresholdReached && !isFetching && !isFetchingMore;
    isAllowToFetchMore ? fetchMore() : resetScrollDetector();
  }, [isTresholdReached, isFetching, isFetchingMore]);

  const renderItem = ({
    item: pokemon,
  }: ListRenderItemInfo<GetPokeDetailResponse>) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PokeDetail", {name: pokemon.name});
          }}>
          <PokeCard
            name={pokemon.name}
            image={pokemon.sprites.front_shiny}
            order={pokemon.order}
            types={pokemon.types}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const flatListProps = !isWeb && {
    onEndReachedThreshold: 0.5,
    onEndReached: () => fetchMore(),
    refreshing: isFetching,
    onRefresh: () => refetch && refetch(),
    refreshControl: (
      <RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />
    ),
    ListFooterComponent: () =>
      shouldRenderLoader ? (
        <ActivityIndicator style={{paddingVertical: 16}} />
      ) : (
        <View />
      ),
  };

  return (
    <>
      {flattenData?.length === 0 && !isFetching && (
        <EmptyResult
          text={`Waah pokemon dengan tipe ${type_} lagi gak ada nih, coba lagi nanti ya 😀`}
        />
      )}
      {data && (flattenData?.length || 0) > 1 && (
        <FlatList
          data={flattenData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name + item.order}
          onLayout={({nativeEvent}) =>
            setIsWide(nativeEvent.layout.width > 600)
          }
          contentContainerStyle={[
            styles.flatListContainer,
            {flexDirection: isWide && isWeb ? "row" : "column"},
          ]}
          {...flatListProps}
        />
      )}
      {shouldRenderLoader && isWeb && (
        <ActivityIndicator style={{paddingVertical: 16}} />
      )}
    </>
  );
};

export default PokeListContainer;
