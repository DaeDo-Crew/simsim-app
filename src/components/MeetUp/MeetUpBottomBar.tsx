import * as React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Divider from "modules/Divider";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import axios from "axios";
import { MEETING_REGISTER_URL, MEETING_UNREGISTER_URL } from "./apiUrls";
import theme from "theme";

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
  const token = useSelector(getUserToken);
  const [isRegistered, setIsRegistered] = React.useState<boolean>(
    userRegistered
  );

  const handleMeetingRegister = React.useCallback(() => {
    axios({
      method: "POST",
      url: MEETING_REGISTER_URL,
      params: {
        meetingId: meetingId,
      },
      headers: {
        Authorization: token.accessToken,
      },
    })
      .then(() => {
        Alert.alert("모임에 참여했습니다.", `${meetingName}`, [
          {
            text: "확인",
          },
        ]);
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
    axios({
      method: "DELETE",
      url: MEETING_UNREGISTER_URL,
      headers: {
        Authorization: token.accessToken,
      },
      params: {
        meetingId: meetingId,
      },
    })
      .then(() => {
        Alert.alert("모임을 참여취소했습니다.", `${meetingName}`, [
          {
            text: "확인",
          },
        ]);
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
          <Text>{`현재 ${currentParticipants}명이 참가중입니다.`}</Text>
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
            참가신청 취소
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
