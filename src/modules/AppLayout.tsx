import * as React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import theme from "theme";
import Snackbar from "modules/Snackbar";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const style = StyleSheet.create({
  MainSection: {
    flex: 1,
    backgroundColor: `${theme.colors.white}`,
  },
});

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  return (
    <View style={style.MainSection}>
      {children}
      <StatusBar style="dark" />
      <Snackbar />
    </View>
  );
}
