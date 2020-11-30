import * as React from "react";
import Divider from "modules/Divider";
import { StyleSheet, View, Text } from "react-native";
import { MeetUpItemBaseStyle } from "./base";
import theme from "theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { parseISO } from "date-fns";
import { formatISO } from "date-fns/esm";

LocaleConfig.locales["kr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "kr";

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
        >{`최대 ${label}명까지 신청 가능`}</Text>
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
  const [meetingStartDate] = React.useState(
    formatISO(parseISO(startDate), { representation: "date" })
  );
  return (
    <>
      <View style={MeetUpInfoStyles.container}>
        <View style={MeetUpInfoStyles.titleContainer}>
          <Text style={MeetUpItemBaseStyle.title}>{`${clubName}의 모임`}</Text>
        </View>
        <MeetUpInfoItem type="DATE" label={startDate} />
        <Calendar
          current={meetingStartDate}
          hideArrows={true}
          style={{ marginBottom: 32 }}
          monthFormat={"yyyy년 MM월"}
          disableMonthChange={true}
          markedDates={{
            [meetingStartDate]: { selected: true },
          }}
          hideExtraDays={true}
          theme={{
            backgroundColor: theme.colors.ligthGrey,
            selectedDayBackgroundColor: theme.colors.primary,
            todayTextColor: theme.colors.primary,
          }}
        />
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
