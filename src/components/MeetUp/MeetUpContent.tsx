import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "modules/Divider";
import { MeetUpItemBaseStyle } from "./base";

type MeetUpContentProps = {
  title: string;
  content: string;
};

export default function MeetUpContent(props: MeetUpContentProps) {
  const { title, content } = props;
  return (
    <>
      <View style={MeetUpContentStyles.container}>
        <View style={MeetUpContentStyles.itemTitleContainer}>
          <Text style={MeetUpItemBaseStyle.title}>모임내용</Text>
        </View>
        <Text style={MeetUpContentStyles.title}>{`"${title}"`}</Text>
        <Text>{content}</Text>
      </View>
      <Divider />
    </>
  );
}

const MeetUpContentStyles = StyleSheet.create({
  container: {
    marginVertical: 32,
  },
  itemTitleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
});
