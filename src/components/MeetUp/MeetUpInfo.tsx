import * as React from "react";
import Divider from "modules/Divider";
import { StyleSheet, View, Text } from "react-native";
import { MeetUpItemBaseStyle } from "./base";
import theme from "theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MeetUpInfoType = "DATE" | "PERSONNEL" | "LOCATION";

function MeetUpInfoItem({
  type,
  label,
}: {
  type: MeetUpInfoType;
  label: string;
}) {
  if (type == "DATE") {
    return (
      <View style={MeetUpInfoStyles.itemContainer}>
        <MaterialCommunityIcons
          name="calendar"
          size={24}
          color={theme.colors.darkGrey}
        />
        <Text
          style={MeetUpInfoStyles.itemLabelText}
        >{`${label}에 진행됨`}</Text>
      </View>
    );
  } else if (type == "PERSONNEL") {
    return (
      <View style={MeetUpInfoStyles.itemContainer}>
        <MaterialCommunityIcons
          name="account-alert"
          size={24}
          color={theme.colors.darkGrey}
        />
        <Text
          style={MeetUpInfoStyles.itemLabelText}
        >{`최대${label}명까지 신청 가능`}</Text>
      </View>
    );
  } else if (type == "LOCATION") {
    return (
      <View style={MeetUpInfoStyles.itemContainer}>
        <MaterialCommunityIcons
          name="map-marker-question"
          size={24}
          color={theme.colors.darkGrey}
        />
        <Text style={MeetUpInfoStyles.itemLabelText}>{label}</Text>
      </View>
    );
  }
  return null;
}

export default function MeetUpInfo({
  startDate,
  maxParticipants,
  location,
  clubName,
}: {
  startDate: string;
  maxParticipants: number;
  location: string;
  clubName: string;
}) {
  return (
    <>
      <View style={MeetUpInfoStyles.container}>
        <View style={MeetUpInfoStyles.titleContainer}>
          <Text style={MeetUpItemBaseStyle.title}>{`${clubName}의 모임`}</Text>
        </View>
        <MeetUpInfoItem type="DATE" label={startDate} />
        <MeetUpInfoItem type="PERSONNEL" label={maxParticipants.toString()} />
        <MeetUpInfoItem type="LOCATION" label={location} />
      </View>
      <Divider />
    </>
  );
}

const MeetUpInfoStyles = StyleSheet.create({
  container: {
    marginVertical: 32,
  },
  titleContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabelText: {
    marginLeft: 16,
    fontSize: 14,
    color: theme.colors.black,
  },
});
