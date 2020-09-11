import React from "react";
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  rootW: {
    paddingHorizontal: "15%",
  },
});

interface Props {
  style?: StyleProp<ViewStyle>;
}

const isWide = Dimensions.get("window").width > 600;

const Container: React.FC<Props> = ({style, children}) => {
  return (
    <View style={[styles.root, isWide && styles.rootW, style]}>{children}</View>
  );
};

export default Container;
