/* eslint-disable global-require */
import React from "react";
import {Image, View} from "react-native";

import Colors from "../constants/Colors";
import Spacer from "./Spacer";
import Text from "./Text";

const AppBar = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image
        source={require("../assets/poke_icon.png")}
        style={{width: 30, height: 30, alignSelf: "center"}}
      />
      <Spacer width={8} />
      <Text
        variant="title"
        value="Pokoke"
        style={{
          color: Colors.white,
          fontSize: 24,
          fontWeight: "bold",
        }}
      />
    </View>
  );
};

export default AppBar;
