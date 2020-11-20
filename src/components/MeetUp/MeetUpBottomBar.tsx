import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "modules/Divider";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import axios from "axios";
import { MEETING_REGISTER_URL, MEETING_UNREGISTER_URL } from "./apiUrls";
import { showSnackbar } from "modules/Snackbar/redux/actions";

export default function MeetUpBottomBar({
  currentParticipants,
  meetingId,
}: {
  currentParticipants: number;
  meetingId: number;
}) {
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const [isRegistered, setIsRegistered] = React.useState<boolean>();

  React.useEffect(() => {
    console.log(meetingId);
  });

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
        dispatch(
          showSnackbar({ visible: true, message: "모임에 참가신청 했습니다." })
        );
        setIsRegistered(true);
      })
      .catch((error) => console.log(error));
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
        dispatch(
          showSnackbar({
            visible: true,
            message: "모임의 참가신청을 취소했습니다.",
          })
        );
        setIsRegistered(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Divider />
      <View style={MeetUpBottomBarStyle.container}>
        <Text>{`현재 ${currentParticipants}명이 참가중입니다.`}</Text>
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
            참가신청취소
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
    padding: 6,
  },
});
