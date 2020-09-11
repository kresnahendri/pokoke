import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {SvgUri} from "react-native-svg";

import Colors from "../constants/Colors";
import {PokeType} from "../hooks/http/poke/pokeModels";
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
    height: 150,
    justifyContent: "center",
  },
  typeContainer: {
    flexDirection: "row",
    minHeight: 21,
  },
  type_: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
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
        {image ? (
          <SvgUri width={120} height={120} uri={image} />
        ) : (
          <ActivityIndicator size="large" />
        )}
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
      <View style={styles.typeContainer}>
        {types &&
          types.map((type_: PokeType) => (
            <View style={styles.type_} key={type_.slot}>
              <Text value={type_.type.name} variant="caption" />
            </View>
          ))}
      </View>
    </View>
  );
});

export default PokeCard;
