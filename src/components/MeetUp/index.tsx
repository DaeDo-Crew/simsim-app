import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import AppLayout from "modules/AppLayout";
import MeetUpImageCarousel from "./MeetUpImageCarousel";
import MeetUpHeader from "./MeetUpHeader";
import MeetUpInfo from "./MeetUpInfo";
import MeetUpContent from "./MeetUpContent";
import Community from "./Community";
// import MeetUpComment from "./MeetUpComment";
import { MeetUpItem } from "./redux/types";
import axios from "axios";
import { getUserToken } from "components/Login/redux/selectors";
import { MEETING_DETAIL_URL } from "./apiUrls";

type MeetingProps = {
  key: string;
  name: string;
  params: {
    meetingId: number;
  };
};

export default function MeetUp({ route }: { route: MeetingProps }) {
  const navigation = useNavigation();
  const token = useSelector(getUserToken);

  const [
    meetUpDetailData,
    setMeetUpDetailData,
  ] = React.useState<MeetUpItem | null>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "모임 상세보기",
    });
  });

  React.useEffect(() => {
    if (token !== null) {
      axios
        .get(MEETING_DETAIL_URL, {
          headers: {
            Authorization: token.accessToken,
          },
          params: {
            meetingId: route.params.meetingId,
          },
        })
        .then((response) => {
          setMeetUpDetailData(response.data);
        })
        .catch(() => {
          Alert.alert("데이터를 불러올 수 없습니다.", "", [
            {
              text: "확인",
              onPress: () => navigation.goBack(),
            },
          ]);
        });
    }
  }, []);

  return (
    <AppLayout>
      <ScrollView>
        {meetUpDetailData !== null && (
          <>
            <MeetUpImageCarousel imageUrlList={meetUpDetailData.imgUrlList} />
            <View style={MeetUpItemStyles.container}>
              <>
                <MeetUpHeader
                  title={meetUpDetailData.meetingName}
                  communityName={meetUpDetailData.clubName}
                />
                <MeetUpInfo
                  startDate={meetUpDetailData.startDate}
                  currentParticipants={meetUpDetailData.curParticipant}
                  maxParticipants={meetUpDetailData.maxParticipant}
                  location={meetUpDetailData.meetingLoaction}
                />
                <MeetUpContent content={meetUpDetailData.explanationContent} />
                <Community clubId={meetUpDetailData.clubId} />
                {/* <MeetUpComment /> */}
              </>
            </View>
          </>
        )}
      </ScrollView>
    </AppLayout>
  );
}

const MeetUpItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
});
