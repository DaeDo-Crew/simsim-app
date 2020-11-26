import * as React from "react";
import { View, StyleSheet } from "react-native";
import theme from "theme";
import Snackbar from "modules/Snackbar";
import ImageViewer from "modules/ImageViewer";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

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
          <StatusBar style="dark" />
        </SafeAreaView>
      ) : (
        <View style={style.MainSection}>
          {children}
          <StatusBar style="dark" />
          <Snackbar />
          <ImageViewer />
        </View>
      )}
    </>
  );
}
