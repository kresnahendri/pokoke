import {StatusBar} from "expo-status-bar";
import React, {Suspense} from "react";
import {ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import RootNavigation from "./src/navigations/RootNavigation";

export default function App() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      <SafeAreaView style={{flex: 1}}>
        <RootNavigation />
      </SafeAreaView>
    </Suspense>
  );
}
