import React from "react";
import {StyleSheet, View} from "react-native";

import {PokeType} from "../hooks/http/poke/pokeModels";
import Text from "./Text";

const styles = StyleSheet.create({
  root: {
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
  types: PokeType[];
}

const PokeTypeBadge: React.FC<Props> = ({types}) => {
  return (
    <View style={styles.root}>
      {types.map((type_: PokeType) => (
        <View style={styles.type_} key={type_.slot}>
          <Text value={type_.type.name} variant="caption" />
        </View>
      ))}
    </View>
  );
};

export default PokeTypeBadge;
