import * as React from "react";
import { Provider as StoreProvider } from "react-redux";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import RootNavigator from "navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { store, persistor } = createReduxStore();

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0a4e9b",
      accent: "#0a4e9b",
      text: "#2b2926",
      placeholder: "#bdbdbd",
    },
  };

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
