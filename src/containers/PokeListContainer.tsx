import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";

import EmptyResult from "../components/EmptyResult";
import PokeCard from "../components/PokeCard";
import {useScrollTreshold} from "../hooks/dom/useScrollTreshold";
import {GetPokeDetailResponse} from "../hooks/http/poke/useGetPokeDetail";
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

  /**
   * ! Not Efficient, because if data always empty
   * ! it will nostop to refetch, dangerous
   */
  // useEffect(() => {
  //   if (pokeList.data) {
  //     const isDataExist =
  //       pokeList.data.filter((data) => data.length > 0).length > 0;
  //     if (!isDataExist) {
  //       console.log("FetchMore");
  //       pokeList.fetchMore();
  //     }
  //   }
  // }, [pokeList.data]);

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
            image={pokemon.sprites.other.dream_world.front_default}
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
    refreshing: isLoading,
    onRefresh: () => refetch && refetch(),
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
      {(shouldRenderLoader && isWeb) ||
        (shouldRenderLoader && flattenData?.length === 0 && (
          <ActivityIndicator style={{paddingVertical: 16}} />
        ))}
    </>
  );
};

export default PokeListContainer;
