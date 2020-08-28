import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "modules/Divider";

export default function MeetUpContent({ content }: { content: string }) {
  return (
    <>
      <View style={MeetUpContentStyles.container}>
        <Text>{content}</Text>
      </View>
      <Divider />
    </>
  );
}

const MeetUpContentStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
