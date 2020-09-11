import React, {Suspense} from "react";
import {ActivityIndicator} from "react-native";

import RootNavigation from "./src/navigations/RootNavigation";

export default function App() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <RootNavigation />
    </Suspense>
  );
}
