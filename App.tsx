import * as React from "react";
import * as Font from "expo-font";
import RootNavigator from "navigators/RootNavigator";

export default function App() {
  const [loaded] = Font.useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return <RootNavigator />;
}
