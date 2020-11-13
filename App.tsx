import * as React from "react";
import { Provider as StoreProvider } from "react-redux";
import createReduxStore from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import RootNavigator from "navigators/RootNavigator";

const { store, persistor } = createReduxStore();

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0a4e9b",
    },
  };

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
