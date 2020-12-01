import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import AppLayout from "modules/AppLayout";
import MeetUpImageCarousel from "./MeetUpImageCarousel";
import MeetUpHeader from "./MeetUpHeader";
import MeetUpInfo from "./MeetUpInfo";
import MeetUpContent from "./MeetUpContent";
import ClubCard from "components/Club/ClubCard";
// import MeetUpComment from "./MeetUpComment";
import MeetUpBottomBar from "./MeetUpBottomBar";
import { MeetUpItem } from "./redux/types";
import { getUserToken } from "components/Login/redux/selectors";
import { axiosInstance } from "utils/axiosInstance";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { showBanner } from "modules/banner/redux/actions";
import * as WebBrowser from "expo-web-browser";

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
  const dispatch = useDispatch();

  const [
    meetUpDetailData,
    setMeetUpDetailData,
  ] = React.useState<MeetUpItem | null>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
    });
  });

  React.useEffect(() => {
    if (token !== null) {
      axiosInstance
        .get("/meeting/read", {
          headers: {
            Authorization: token.accessToken,
          },
          params: {
            meetingId: route.params.meetingId,
          },
        })
        .then(async (response) => {
          setMeetUpDetailData(response.data);
          //TODO: 이후 이부분 모듈화 하던지 뭘하던지 리팩토링 해야함
          const kakaoOpenChatLink = await axiosInstance({
            method: "GET",
            url: "/meeting/get/chaturl",
            params: {
              meetingId: response.data.meetingId,
            },
            headers: {
              Authorization: token.accessToken,
            },
          }).then((response) => {
            return response.data;
          });
          if (typeof kakaoOpenChatLink !== "undefined") {
            dispatch(
              showBanner({
                visible: true,
                onPressConfirm: async () =>
                  await WebBrowser.openBrowserAsync(kakaoOpenChatLink).catch(
                    () =>
                      dispatch(
                        showSnackbar({
                          visible: true,
                          message: "카카오톡 오폰채팅방을 열 수 없습니다.",
                        })
                      )
                  ),
                confirmLabel: "이동하기",
                descriptionText: `모임 "${response.data.meetingName}"에 대해 카카오톡 오픈채팅방이 개설되었습니다.`,
              })
            );
          }
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
  }, [token]);

  return (
    <AppLayout isSafeArea={true}>
      {meetUpDetailData !== null && (
        <>
          <ScrollView scrollIndicatorInsets={{ right: 1 }}>
            <MeetUpImageCarousel imageUrlList={meetUpDetailData.imgUrlList} />
            <View style={MeetUpItemStyles.container}>
              <>
                <MeetUpHeader
                  title={meetUpDetailData.meetingName}
                  createdTime={meetUpDetailData.createdTime}
                />
                <MeetUpInfo
                  startDate={meetUpDetailData.startDate}
                  maxParticipants={meetUpDetailData.maxParticipant}
                  location={meetUpDetailData.meetingPlace}
                  clubName={meetUpDetailData.clubName}
                />
                <MeetUpContent
                  title={meetUpDetailData.explanationTitle}
                  content={meetUpDetailData.explanationContent}
                />
                <ClubCard clubId={meetUpDetailData.clubId} />
                {/* <MeetUpComment /> */}
              </>
            </View>
          </ScrollView>
          <MeetUpBottomBar
            deadline={meetUpDetailData.deadline}
            userRegistered={meetUpDetailData.applied}
            meetingName={meetUpDetailData.meetingName}
            meetingId={meetUpDetailData.meetingId}
            currentParticipants={meetUpDetailData?.curParticipant}
          />
        </>
      )}
    </AppLayout>
  );
}

const MeetUpItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
