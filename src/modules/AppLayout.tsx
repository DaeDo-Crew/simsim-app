import * as React from "react";
import { View, StyleSheet } from "react-native";
import theme from "theme";
import Snackbar from "modules/Snackbar";
import { SafeAreaView } from "react-native-safe-area-context";

type AppLayoutProps = {
  children?: React.ReactNode;
  isSafeArea?: boolean;
};

const style = StyleSheet.create({
  MainSection: {
    flex: 1,
    backgroundColor: `${theme.colors.white}`,
  },
});

export default function AppLayout(props: AppLayoutProps) {
  const { children, isSafeArea } = props;

  return (
    <>
      {isSafeArea ? (
        <SafeAreaView style={style.MainSection} edges={["bottom"]}>
          {children}
          <Snackbar />
        </SafeAreaView>
      ) : (
        <View style={style.MainSection}>
          {children}
          <Snackbar />
        </View>
      )}
    </>
  );
}
