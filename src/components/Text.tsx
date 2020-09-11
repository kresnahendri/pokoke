import React from "react";
import {StyleSheet, Text as RNText, TextStyle} from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  body: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  caption: {
    fontSize: 12,
  },
  bold: {
    fontWeight: "700",
  },
});

type variant = "title" | "body" | "caption";
type weight = "normal" | "bold";
type color = "primary" | "white" | "lighter" | "light" | "dark" | "black";

interface Props {
  value: string;
  variant?: variant;
  weight?: weight;
  style?: TextStyle;
  color?: color;
}

const Text: React.FC<Props> = ({
  value,
  variant = "body",
  weight = "normal",
  style = {},
  color = Colors.dark,
  children,
}) => {
  const createVariantStyle = () => {
    switch (variant) {
      case "title":
        return styles.title;
      case "caption":
        return styles.caption;
      case "body":
      default:
        return styles.body;
    }
  };

  const createWeightStyle = () => {
    switch (weight) {
      case "bold":
        return styles.bold;
      case "normal":
      default:
        return {};
    }
  };

  const createColorStyle = () => {
    switch (color) {
      case "primary":
        return Colors.primary;
      case "white":
        return Colors.white;
      case "light":
        return Colors.light;
      case "lighter":
        return Colors.lighter;
      case "black":
        return Colors.black;
      case "dark":
      default:
        return Colors.dark;
    }
  };

  return (
    <RNText
      style={[
        {color: createColorStyle()},
        createVariantStyle(),
        createWeightStyle(),
        style,
      ]}>
      {value}
      {children}
    </RNText>
  );
};

export default Text;
