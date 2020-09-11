import React from "react";
import {StyleSheet, TextStyle, View} from "react-native";

import Colors from "../constants/Colors";
import Text from "./Text";

const styles = StyleSheet.create({
  root: {
    borderColor: Colors.black,
    borderWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 24,
  },
  active: {
    backgroundColor: Colors.black,
  },
});

interface Props {
  isActive: boolean;
  value: string;
}
const Pill: React.FC<Props> = ({value, isActive = false}) => {
  const textStyle: TextStyle = {
    marginTop: 0,
    textTransform: "capitalize",
    fontSize: 20,
    color: isActive ? Colors.white : Colors.dark,
  };

  return (
    <View style={[styles.root, isActive && styles.active]}>
      <Text value={value} style={textStyle} />
    </View>
  );
};

export default Pill;
