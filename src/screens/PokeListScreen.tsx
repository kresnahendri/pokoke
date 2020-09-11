import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

import Container from "../components/Container";
import Pill from "../components/Pill";
import Spacer from "../components/Spacer";
import PokeCardContainer from "../containers/PokeCardContainer";
import {useScrollTreshold} from "../hooks/dom/useScrollTreshold";
import {Pokemon} from "../hooks/http/poke/pokeModels";
import {useGetPokeList} from "../hooks/http/poke/useGetPokeList";
import {useGetPokeTypeList} from "../hooks/http/poke/useGetPokeTypeList";
import {
  PokeListNavigation,
  PokeListRoute,
} from "../navigations/NavigationProps";

const isWeb = Platform.OS === "web";

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: isWeb ? "row" : "column",
    flexWrap: isWeb ? "wrap" : "nowrap",
    justifyContent: "center",
  },
});
interface Props {
  route: PokeListRoute;
  navigation: PokeListNavigation;
}

const PokeListScreen: React.FC<Props> = ({navigation}) => {
  const pokeType = useGetPokeTypeList();
  const pokeList = useGetPokeList();
  const [isWide, setIsWide] = useState(true);
  const [selectedType, setSectedType] = useState("all");
  const {isTresholdReached, reset: resetScrollDetector} = useScrollTreshold(
    200,
  );

  useEffect(() => {
    const isAllowToFetchMore =
      isTresholdReached &&
      !pokeList.isFetching &&
      !pokeList.isFetchingMore &&
      !pokeList.isLoading;
    isAllowToFetchMore ? pokeList.fetchMore() : resetScrollDetector();
  }, [isTresholdReached, pokeList]);

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

  const flatListProps = isWeb
    ? {}
    : {
        onEndReachedThreshold: 0.5,
        onEndReached: () => pokeList.fetchMore(),
        refreshing: pokeList.isLoading,
        onRefresh: () => {
          if (pokeList.refetch) {
            pokeList.refetch();
          }
        },
        ListFooterComponent: () =>
          shouldRenderLoader ? (
            <ActivityIndicator style={{paddingVertical: 16}} />
          ) : (
            <View />
          ),
      };

  const renderPill = (name: string) => {
    return (
      <>
        <TouchableOpacity onPress={() => setSectedType(name)}>
          <Pill key={name} isActive={selectedType === name} value={name} />
        </TouchableOpacity>
        <Spacer width={8} />
      </>
    );
  };
  return (
    <Container>
      <ScrollView
        horizontal={true}
        style={{height: 70, paddingLeft: 10, paddingVertical: 12}}
        contentContainerStyle={{alignItems: "flex-end"}}
        showsHorizontalScrollIndicator={false}>
        {renderPill("all")}
        {pokeType.data?.results.map(({name}) => renderPill(name))}
      </ScrollView>
      {pokeList.data && (
        <FlatList
          onLayout={({nativeEvent}) => {
            setIsWide(nativeEvent.layout.width > 600);
          }}
          contentContainerStyle={[
            styles.flatListContainer,
            isWide && isWeb
              ? {flexDirection: "row"}
              : {flexDirection: "column"},
          ]}
          data={pokeList.data.flatMap((x) => x.results)}
          renderItem={renderItem}
          keyExtractor={(item) => item.name + item.url}
          {...flatListProps}
        />
      )}
      {shouldRenderLoader && isWeb && (
        <ActivityIndicator style={{paddingVertical: 16}} />
      )}
    </Container>
  );
};

export default PokeListScreen;
