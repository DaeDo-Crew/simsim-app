import * as React from "react";
import axios from "axios";
import { Alert } from "react-native";
import { MY_MEETING_LIST } from "./apiUrls";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MeetUpItem } from "components/MeetUp/redux/types";
import MeetupCardList from "./MeetupCardList";

export default function CurrentMeetUpList() {
  const token = useSelector(getUserToken);
  const [meetupList, setMeetupList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null) {
      axios
        .get(MY_MEETING_LIST, {
          headers: {
            Authorization: token.accessToken,
          },
        })
        .then((response) => {
          setMeetupList(response.data);
        })
        .catch(() => {
          Alert.alert("내가 참여한 모임을 불러올 수 없습니다.", "", [
            {
              text: "확인",
            },
          ]);
        });
    }
  }, []);

  return (
    <>
      {typeof meetupList !== "undefined" && (
        <MeetupCardList title="내가 참여한 모임" meetupList={meetupList} />
      )}
    </>
  );
}