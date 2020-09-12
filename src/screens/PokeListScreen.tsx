import React, {lazy, Suspense, useState} from "react";
import {ActivityIndicator, Platform, StyleSheet, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";

import Container from "../components/Container";
import Pill from "../components/Pill";
import Spacer from "../components/Spacer";
import Colors from "../constants/Colors";
import {useGetPokeTypeList} from "../hooks/http/poke/useGetPokeTypeList";
import {
  PokeListNavigation,
  PokeListRoute,
} from "../navigations/NavigationProps";

const PokeListContainer = lazy(() => import("../containers/PokeListContainer"));

const styles = StyleSheet.create({
  scrollWrapperFirst: {
    zIndex: 1,
  },
  scrollWrapperSecond: {
    height: 64,
    alignContent: "center",
    backgroundColor: Colors.white,
  },
  typeScrollView: {
    height: 50,
    flexDirection: "row",
  },
  typeScrollViewContainer: {
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  pokeListContainer: {
    flex: 100,
    paddingTop: Platform.OS === "web" ? 10 : 60,
  },
});
interface Props {
  route: PokeListRoute;
  navigation: PokeListNavigation;
}

const PokeListScreen: React.FC<Props> = ({navigation}) => {
  const [selectedType, setSectedType] = useState("all");
  const pokeType = useGetPokeTypeList();

  const renderPill = (name: string) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setSectedType(name);
          }}>
          <Pill key={name} isActive={selectedType === name} value={name} />
        </TouchableOpacity>
        <Spacer width={8} />
      </>
    );
  };

  return (
    <>
      <View style={styles.scrollWrapperFirst}>
        <View style={styles.scrollWrapperSecond}>
          <ScrollView
            horizontal={true}
            style={styles.typeScrollView}
            contentContainerStyle={styles.typeScrollViewContainer}
            showsHorizontalScrollIndicator={false}>
            <Spacer width={12} />
            {renderPill("all")}
            {pokeType.data?.results.map(({name}) => renderPill(name))}
            <Spacer width={12} />
          </ScrollView>
        </View>
      </View>
      <View style={styles.pokeListContainer}>
        <Container>
          <Suspense fallback={<ActivityIndicator />}>
            <PokeListContainer type_={selectedType} navigation={navigation} />
          </Suspense>
        </Container>
      </View>
    </>
  );
};

export default PokeListScreen;
