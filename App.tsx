import * as React from "react";
import { Provider } from "react-redux";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";
import RootNavigator from "navigators/RootNavigator";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
