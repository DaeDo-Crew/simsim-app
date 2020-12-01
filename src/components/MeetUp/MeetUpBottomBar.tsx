import * as React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Divider from "modules/Divider";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import theme from "theme";
import { axiosInstance } from "utils/axiosInstance";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { showBanner } from "modules/banner/redux/actions";
import * as WebBrowser from "expo-web-browser";

export default function MeetUpBottomBar({
  currentParticipants,
  meetingId,
  meetingName,
  userRegistered,
  deadline,
}: {
  currentParticipants: number;
  meetingId: number;
  meetingName: string;
  userRegistered: boolean;
  deadline: string;
}) {
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const [isRegistered, setIsRegistered] = React.useState<boolean>(
    userRegistered
  );
  const [
    currentMeetingParticipants,
    setCurrentMeetingParticipants,
  ] = React.useState(currentParticipants);

  // TODO: 불필요한 api call?
  // 조금 더 효율적이게 바꿔야함
  React.useEffect(() => {
    axiosInstance({
      method: "GET",
      url: "/meeting/read",
      headers: {
        Authorization: token.accessToken,
      },
      params: {
        meetingId: meetingId,
      },
    }).then((response) => {
      setCurrentMeetingParticipants(response.data.curParticipant);
    });
  }, [isRegistered]);

  const handleMeetingRegister = React.useCallback(() => {
    axiosInstance({
      method: "POST",
      url: "/meeting/user/register",
      params: {
        meetingId: meetingId,
      },
      headers: {
        Authorization: token.accessToken,
      },
    })
      .then(async () => {
        dispatch(
          showSnackbar({
            visible: true,
            message: `${meetingName}에 참가 신청했습니다.`,
          })
        );

        //TODO: 이후 이부분 모듈화 하던지 뭘하던지 리팩토링 해야함
        const kakaoOpenChatLink = await axiosInstance({
          method: "GET",
          url: "/meeting/get/chaturl",
          params: {
            meetingId: meetingId,
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
                await WebBrowser.openBrowserAsync(kakaoOpenChatLink).catch(() =>
                  dispatch(
                    showSnackbar({
                      visible: true,
                      message: "카카오톡 오폰채팅방을 열 수 없습니다.",
                    })
                  )
                ),
              confirmLabel: "이동하기",
              descriptionText: `해당 모임(${meetingName})에 대해 카카오톡 오픈채팅방이 만들어져 있습니다.`,
            })
          );
        }
        setIsRegistered(true);
      })
      .catch((error) => {
        Alert.alert("오류가 발생했습니다.", `${error.response.data}`, [
          {
            text: "확인",
          },
        ]);
      });
  }, []);

  const handleMeetingUnregister = React.useCallback(() => {
    axiosInstance({
      method: "DELETE",
      url: "/meeting/user/cancel",
      headers: {
        Authorization: token.accessToken,
      },
      params: {
        meetingId: meetingId,
      },
    })
      .then(() => {
        dispatch(
          showSnackbar({
            visible: true,
            message: `${meetingName}의 참가를 취소했습니다.`,
          })
        );
        dispatch(showBanner(null));
        setIsRegistered(false);
      })
      .catch((error) => {
        Alert.alert("오류가 발생했습니다.", `${error.response.data}`, [
          {
            text: "확인",
          },
        ]);
      });
  }, []);

  return (
    <>
      <Divider />
      <View style={MeetUpBottomBarStyle.container}>
        <View>
          <Text>{`현재 ${currentMeetingParticipants}명이 참가중입니다.`}</Text>
          <Text
            style={MeetUpBottomBarStyle.deadlineTextStyle}
          >{`${deadline}까지 신청가능`}</Text>
        </View>
        {isRegistered === false && typeof isRegistered !== "undefined" ? (
          <Button
            mode="contained"
            compact={true}
            style={MeetUpBottomBarStyle.meetingRegisterButton}
            labelStyle={MeetUpBottomBarStyle.meetingRegisterLabel}
            onPress={handleMeetingRegister}
          >
            참가신청
          </Button>
        ) : (
          <Button
            mode="contained"
            compact={true}
            style={MeetUpBottomBarStyle.meetingRegisterButton}
            labelStyle={MeetUpBottomBarStyle.meetingRegisterLabel}
            onPress={handleMeetingUnregister}
          >
            참가취소
          </Button>
        )}
      </View>
    </>
  );
}

const MeetUpBottomBarStyle = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  meetingRegisterLabel: {
    fontWeight: "700",
  },
  meetingRegisterButton: {
    padding: 4,
  },
  deadlineTextStyle: {
    fontSize: 10,
    color: theme.colors.darkGrey,
  },
});
