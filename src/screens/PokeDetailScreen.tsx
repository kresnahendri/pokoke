/* eslint-disable react/no-array-index-key */
import React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {SvgUri} from "react-native-svg";

import Container from "../components/Container";
import Spacer from "../components/Spacer";
import Text from "../components/Text";
import {useGetPokeDetail} from "../hooks/http/poke/useGetPokeDetail";
import {
  PokeDetailNavigation,
  PokeDetailRoute,
} from "../navigations/NavigationProps";

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  images: {
    flex: 1,
    alignItems: "center",
  },
  thumbnails: {
    flexDirection: "row",
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

interface Props {
  route: PokeDetailRoute;
  navigation: PokeDetailNavigation;
}

const PokeDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {data, isLoading} = useGetPokeDetail({name: route.params.name});

  if (!data || isLoading) {
    return <ActivityIndicator />;
  }

  const {
    back_default,
    back_shiny,
    front_default,
    front_shiny,
    other,
  } = data.sprites;
  const image = other.dream_world.front_default || "";

  navigation.setOptions({title: data.name});

  return (
    <ScrollView style={styles.root}>
      <Container>
        <View style={styles.images}>
          <Spacer height={12} />
          {Platform.OS === "web" ? (
            <Image
              style={{width: 120, height: 120}}
              source={{uri: image}}
              resizeMode="contain"
            />
          ) : (
            <SvgUri width={175} height={175} uri={image} />
          )}

          <Spacer height={16} />
          <View style={styles.thumbnails}>
            {[back_default, back_shiny, front_default, front_shiny].map(
              (thumbnail, i) => (
                <Image
                  key={i}
                  source={{uri: thumbnail}}
                  style={{width: 70, height: 70}}
                />
              ),
            )}
          </View>
        </View>
        <Spacer height={24} />
        <View>
          <Text weight="bold" value="Moves" />
          <Spacer height={8} />
          <View style={styles.description}>
            {data.moves.map(({move}) => (
              <Text
                value={move.name}
                key={move.name}
                style={{marginRight: 10}}
              />
            ))}
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};

export default PokeDetailScreen;
