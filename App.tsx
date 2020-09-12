import {StatusBar} from "expo-status-bar";
import React, {Suspense} from "react";
import {ActivityIndicator, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import RootNavigation from "./src/navigations/RootNavigation";

const SwitchSafe: React.FC = ({children}) => {
  return Platform.OS === "web" ? (
    <>{children}</>
  ) : (
    <SafeAreaView style={{flex: 1}}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SwitchSafe>
      <RootNavigation />
    </SwitchSafe>
  );
}
