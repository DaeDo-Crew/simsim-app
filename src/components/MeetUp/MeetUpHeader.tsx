import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from "theme";
import Divider from "modules/Divider";
import { MeetUpItemBaseStyle } from "./base";

export default function MeetUpHeader({
  title,
  createdTime,
}: {
  title: string;
  createdTime: string;
}) {
  return (
    <>
      <View style={MeetUpHeaderStyles.container}>
        <Text style={MeetUpItemBaseStyle.title}>{title}</Text>
        <Text
          style={MeetUpHeaderStyles.createdTime}
        >{`${createdTime}에 게시됨`}</Text>
      </View>
      <Divider />
    </>
  );
}

const MeetUpHeaderStyles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },

  createdTime: {
    fontSize: 14,
    color: theme.colors.darkGrey,
    fontStyle: "italic",
  },
});
