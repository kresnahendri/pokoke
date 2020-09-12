import React from "react";
import {Image, StyleSheet, View} from "react-native";

import Colors from "../constants/Colors";
import {PokeType} from "../hooks/http/poke/pokeModels";
import PokeTypeBadge from "./PokeTypeBadge";
import Spacer from "./Spacer";
import Text from "./Text";

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 28,
    flex: 1,
    minWidth: 275,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  imageContainer: {
    height: 100,
    justifyContent: "center",
  },
});

interface Props {
  name: string;
  image?: string;
  order?: number;
  types?: PokeType[];
}

const PokeCard: React.FC<Props> = React.memo(({name, image, order, types}) => {
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: image}}
          resizeMode="contain"
        />
      </View>
      <Text value={`#${order || ""}`} />
      <Spacer height={8} />
      <Text
        variant="title"
        color="black"
        value={name}
        style={{textTransform: "capitalize"}}
      />
      <Spacer height={8} />
      {types && <PokeTypeBadge types={types} />}
    </View>
  );
});

export default PokeCard;
