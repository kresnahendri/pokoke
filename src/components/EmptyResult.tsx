import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

import Spacer from "./Spacer";
import Text from "./Text";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 50,
  },
});

interface Props {
  text: string;
}

const EmptyResult: React.FC<Props> = ({text}) => {
  return (
    <ScrollView style={styles.root}>
      <View style={styles.wrapper}>
        <Spacer height={60} />
        <Image
          source={require("../assets/pika_sad.png")}
          style={{width: 300, height: 200, alignSelf: "center"}}
          resizeMode="contain"
        />
        <Text
          value={text}
          style={{
            textAlign: "center",
            lineHeight: 30,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EmptyResult;
