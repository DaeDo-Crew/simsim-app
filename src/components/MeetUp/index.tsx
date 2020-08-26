import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import AppLayout from "modules/AppLayout";
import MeetUpImageCarousel from "./MeetUpImageCarousel";
import MeetUpHeader from "./MeetUpHeader";
import MeetUpInfo from "./MeetUpInfo";
import MeetUpContent from "./MeetUpContent";
import Community from "./Community";
import MeetUpComment from "./MeetUpComment";

export default function MeetUp() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "모임 상세보기",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <MeetUpImageCarousel />
        <View style={MeetUpItemStyles.container}>
          <MeetUpHeader title="일일 댄스 클래스" communityName="RAH" />
          <MeetUpInfo
            date="2020년 10월 24일"
            personnel="현재 2명 / 최대 8명"
            location="시립대학교 정문 [주향]"
          />
          <MeetUpContent />
          <Community />
          <MeetUpComment />
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
