import * as React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MeetUpItem } from "components/MeetUp/redux/types";
import MeetupCardList from "../MeetupCardList";
import { axiosInstance } from "utils/axiosInstance";

export default function MySubscribeClubListMeetUpListItem({
  clubId,
}: {
  clubId: number;
}) {
  const token = useSelector(getUserToken);
  const [meetupList, setMeetupList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null) {
      axiosInstance({
        url: "/meeting/club/list",
        method: "GET",
        headers: {
          Authorization: token.accessToken,
        },
        params: {
          clubId: clubId,
        },
      })
        .then((response) => {
          setMeetupList(response.data);
        })
        .catch(() => {
          Alert.alert("내가 구독한 동아리의 모임을 불러올 수 없습니다.", "", [
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
        <MeetupCardList
          title={`내가 구독한 ${meetupList[0].clubName}의 모임`}
          meetupList={meetupList}
        />
      )}
    </>
  );
}
