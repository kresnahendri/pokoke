import {Entypo, FontAwesome5, Ionicons} from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {SvgUri} from "react-native-svg";

import Container from "../components/Container";
import PokeTypeBadge from "../components/PokeTypeBadge";
import ProgressLine from "../components/ProgressLine";
import Spacer from "../components/Spacer";
import Text from "../components/Text";
import Colors from "../constants/Colors";
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
  thumbnailImage: {
    width: 70,
    height: 70,
    borderColor: Colors.light,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.light,
    margin: 8,
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  stats: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

interface Props {
  route: PokeDetailRoute;
  navigation: PokeDetailNavigation;
}

const PokeDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {data, isLoading, refetch, isFetching} = useGetPokeDetail({
    name: route.params.name,
  });

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

  const renderImages = () => {
    return (
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
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                source={{uri: thumbnail}}
                style={styles.thumbnailImage}
              />
            ),
          )}
        </View>
      </View>
    );
  };

  const renderSummary = () => {
    return (
      <View style={[styles.row, {justifyContent: "center"}]}>
        <View style={styles.row}>
          <Entypo name="ruler" size={32} color="blue" />
          <Spacer width={4} />
          <Text
            weight="bold"
            value={`H: ${data.height.toString()}`}
            variant="title"
          />
        </View>
        <Spacer width={24} />
        <View style={styles.row}>
          <FontAwesome5 name="weight" size={32} color="green" />
          <Spacer width={4} />
          <Text
            weight="bold"
            value={`W: ${data.weight.toString()}`}
            variant="title"
          />
        </View>
        <Spacer width={24} />
        <View style={styles.row}>
          <FontAwesome5 name="fire" size={32} color="red" />
          <Spacer width={4} />
          <Text
            weight="bold"
            value={`XP: ${data.base_experience.toString()}`}
            variant="title"
          />
        </View>
      </View>
    );
  };

  const renderTypes = () => {
    <View>
      <View style={styles.row}>
        <Text weight="bold" value="Types" />
      </View>
      <Spacer height={8} />
      {data.types && <PokeTypeBadge types={data.types} />}
    </View>;
  };

  const renderStats = () => {
    return (
      <View>
        <View style={styles.row}>
          <Ionicons name="md-stats" size={32} color={Colors.black} />
          <Spacer width={4} />
          <Text weight="bold" value="Statistics" />
        </View>
        <Spacer height={8} />
        {data.stats.map(({stat, base_stat}) => (
          <View key={stat.name} style={styles.stats}>
            <Text
              variant="caption"
              weight="bold"
              value={`${stat.name} (${base_stat})`}
            />
            <Spacer height={4} />
            <ProgressLine percentage={base_stat} />
          </View>
        ))}
      </View>
    );
  };

  const renderMoves = () => {
    return (
      <View>
        <View style={styles.row}>
          <Ionicons name="ios-build" size={32} color={Colors.black} />
          <Spacer width={4} />
          <Text weight="bold" value="Moves" />
        </View>
        <Spacer height={8} />
        <View style={styles.description}>
          {data.moves.map(({move}) => (
            <Text
              value={move.name}
              key={move.name}
              style={{marginRight: 10, textDecorationLine: "underline"}}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.root}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />
      }>
      <Container>
        {renderImages()}
        <Spacer height={24} />
        {renderSummary()}
        <Spacer height={12} />
        {renderTypes()}
        <Spacer height={24} />
        {renderStats()}
        <Spacer height={24} />
        {renderMoves()}
      </Container>
      <Spacer height={16} />
    </ScrollView>
  );
};

export default PokeDetailScreen;
