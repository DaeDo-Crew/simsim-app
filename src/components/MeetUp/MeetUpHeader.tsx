import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from "theme";
import Divider from "modules/Divider";

export default function MeetUpHeader({
  title,
  communityName,
}: {
  title: string;
  communityName: string;
}) {
  return (
    <>
      <View style={MeetUpHeaderStyles.container}>
        <Text style={MeetUpHeaderStyles.title}>{title}</Text>
        <Text style={MeetUpHeaderStyles.communityName}>{communityName}</Text>
      </View>
      <Divider />
    </>
  );
}

const MeetUpHeaderStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  communityName: {
    marginVertical: 8,
    fontSize: 16,
    color: theme.colors.green,
  },
});
