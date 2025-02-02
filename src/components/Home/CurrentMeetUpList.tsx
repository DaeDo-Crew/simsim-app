import * as React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MeetUpItem } from "components/MeetUp/redux/types";
import MeetupCardList from "./MeetupCardList";
import _ from "underscore";
import { parseISO, differenceInHours } from "date-fns";
import { axiosInstance } from "utils/axiosInstance";

export default function CurrentMeetUpList() {
  const token = useSelector(getUserToken);
  const [
    currentAvailableMeetUpList,
    setCurrentAvailableMeetUpList,
  ] = React.useState<MeetUpItem[]>();
  const [pastMeetUpList, setPastMeetUpList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null) {
      axiosInstance({
        url: "/meeting/read/list",
        method: "GET",
        headers: {
          Authorization: token.accessToken,
        },
        params: {
          pageScale: 100,
          offset: 0,
        },
      })
        .then((response) => {
          setPastMeetUpList(
            _.filter(response.data, (data: MeetUpItem) => {
              return differenceInHours(parseISO(data.deadline), new Date()) < 0;
            })
          );
          setCurrentAvailableMeetUpList(
            _.filter(response.data, (data: MeetUpItem) => {
              return differenceInHours(parseISO(data.deadline), new Date()) > 0;
            })
          );
        })
        .catch(() => {
          Alert.alert("모임을 불러올 수 없습니다.", "", [
            {
              text: "확인",
            },
          ]);
        });
    }
  }, []);

  return (
    <>
      <MeetupCardList
        title="현재 신청 가능한 모임"
        meetupList={currentAvailableMeetUpList}
      />
      <MeetupCardList title="아쉽게 놓친 모임" meetupList={pastMeetUpList} />
    </>
  );
}
