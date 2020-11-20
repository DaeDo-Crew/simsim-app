import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import theme from "theme";
import Snackbar from "modules/Snackbar";

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
        <SafeAreaView style={style.MainSection}>
          {children}
          <StatusBar style="dark" />
          <Snackbar />
        </SafeAreaView>
      ) : (
        <View style={style.MainSection}>
          {children}
          <StatusBar style="dark" />
          <Snackbar />
        </View>
      )}
    </>
  );
}
