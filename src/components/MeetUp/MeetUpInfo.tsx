import * as React from "react";
import Divider from "modules/Divider";
import { Fontisto, Entypo } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

type MeetUpInfoType = "DATE" | "PERSONNEL" | "LOCATION";

function MeetUpInfoItem({
  type,
  content,
  secondContent,
}: {
  type: MeetUpInfoType;
  content: string;
  secondContent?: string;
}) {
  if (type == "DATE") {
    return (
      <View style={MeetUpInfoItemStyles.container}>
        <Fontisto name="date" size={24} color="black" />
        <Text>{content}</Text>
      </View>
    );
  } else if (type == "PERSONNEL") {
    return (
      <View style={MeetUpInfoItemStyles.container}>
        <Fontisto name="person" size={24} color="black" />
        <Text>{`현재${content}명 / 최대${secondContent}명`}</Text>
      </View>
    );
  } else if (type == "LOCATION") {
    return (
      <View style={MeetUpInfoItemStyles.container}>
        <Entypo name="location" size={24} color="black" />
        <Text>{content}</Text>
      </View>
    );
  }
  return null;
}

export default function MeetUpInfo({
  startDate,
  currentParticipants,
  maxParticipants,
  location,
}: {
  startDate: string;
  currentParticipants: number;
  maxParticipants: number;
  location: string;
}) {
  return (
    <>
      <MeetUpInfoItem type="DATE" content={startDate} />
      <MeetUpInfoItem
        type="PERSONNEL"
        content={currentParticipants.toString()}
        secondContent={maxParticipants.toString()}
      />
      <MeetUpInfoItem type="LOCATION" content={location} />
      <Divider />
    </>
  );
}

const MeetUpInfoItemStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
