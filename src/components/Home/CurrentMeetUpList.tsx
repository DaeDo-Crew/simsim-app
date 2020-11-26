import * as React from "react";
import axios from "axios";
import { Alert } from "react-native";
import { MEEING_LIST_URL } from "./apiUrls";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MeetUpItem } from "components/MeetUp/redux/types";
import MeetupCardList from "./MeetupCardList";
import _ from "underscore";
import { parseISO, differenceInHours } from "date-fns";

export default function CurrentMeetUpList() {
  const token = useSelector(getUserToken);
  const [allMeetupList, setAllMeetupList] = React.useState<MeetUpItem[]>();
  const [
    currentAvailableMeetUpList,
    setCurrentAvailableMeetUpList,
  ] = React.useState<MeetUpItem[]>();
  const [pastMeetUpList, setPastMeetUpList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null) {
      axios
        .get(MEEING_LIST_URL, {
          headers: {
            Authorization: token.accessToken,
          },
        })
        .then((response) => {
          setAllMeetupList(response.data);
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
          console.log(
            differenceInHours(
              parseISO(response.data[0].createdTime),
              new Date()
            )
          );
          console.log(parseISO(response.data[0].createdTime));
        })
        .catch(() => {
          Alert.alert("모집중인 모임을 불러올 수 없습니다.", "", [
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
      <MeetupCardList title="전체 모임" meetupList={allMeetupList} />
      <MeetupCardList title="아쉽게 놓친 모임" meetupList={pastMeetUpList} />
    </>
  );
}
