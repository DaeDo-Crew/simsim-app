import * as React from "react";
import { useSelector } from "react-redux";
import { getMeetUpList } from "components/MeetUp/redux/selector";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import AppLayout from "modules/AppLayout";
import MeetUpImageCarousel from "./MeetUpImageCarousel";
import MeetUpHeader from "./MeetUpHeader";
import MeetUpInfo from "./MeetUpInfo";
import MeetUpContent from "./MeetUpContent";
import Community from "./Community";
// import MeetUpComment from "./MeetUpComment";
import { MeetUpItem } from "./redux/types";

const TEMP_MEETUP_ITEM: MeetUpItem = {
  category: "아직",
  clubId: 1,
  clubName: "RAH",
  createdTime: "2020년 10월 24일",
  deadline: "2020년 10월 31일",
  startDate: "2020년 10월 25일",
  endDate: "2020년 11월 31일",
  explanationTitle: "어서오세요",
  explanationContent: "모임설명",
  curParticipant: 2,
  maxParticipant: 8,
  meetingId: 1,
  meetingName: "일일 댄스 클래스",
  meetingLoaction: "서울시립대학교 정문 [주향]",
  imgUrlList: ["123"],
};

export default function MeetUp() {
  const navigation = useNavigation();
  const meetUpList = useSelector(getMeetUpList);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "모임 상세보기",
    });
  });

  React.useEffect(() => {
    console.log(meetUpList);
  });

  return (
    <AppLayout>
      <ScrollView>
        <MeetUpImageCarousel />
        <View style={MeetUpItemStyles.container}>
          <MeetUpHeader
            title={TEMP_MEETUP_ITEM.meetingName}
            communityName={TEMP_MEETUP_ITEM.clubName}
          />
          <MeetUpInfo
            startDate={TEMP_MEETUP_ITEM.startDate}
            currentParticipants={TEMP_MEETUP_ITEM.curParticipant}
            maxParticipants={TEMP_MEETUP_ITEM.maxParticipant}
            location={TEMP_MEETUP_ITEM.meetingLoaction}
          />
          <MeetUpContent content={TEMP_MEETUP_ITEM.explanationContent} />
          <Community clubId={TEMP_MEETUP_ITEM.clubId} />
          {/* <MeetUpComment /> */}
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const MeetUpItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
});
