import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function TransparentHeader() {
  return (
    <View style={[{ backgroundColor: "transparent" }, StyleSheet.absoluteFill]}>
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "transparent"]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
