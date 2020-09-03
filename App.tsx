import * as React from "react";
import { Provider as StoreProvider } from "react-redux";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";
import RootNavigator from "navigators/RootNavigator";
import { Provider as AntdProvider } from "@ant-design/react-native";

const { store, persistor } = createReduxStore();

export default function App() {
  const [loaded] = Font.useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AntdProvider>
          <RootNavigator />
        </AntdProvider>
      </PersistGate>
    </StoreProvider>
  );
}
