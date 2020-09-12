import React from "react";
import {StyleSheet, View} from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: Colors.light,
    borderRadius: 4,
  },
  line: {
    borderRadius: 4,
    height: 8,
    backgroundColor: Colors.black,
  },
});

interface Props {
  percentage: number;
}

const ProgressLine: React.FC<Props> = ({percentage}) => {
  return (
    <View style={styles.root}>
      <View style={[styles.line, {width: `${percentage}%`}]} />
    </View>
  );
};

export default ProgressLine;
