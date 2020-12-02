import * as React from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MeetUpItem } from "components/MeetUp/redux/types";
import MeetupCardList from "../MeetupCardList";
import { axiosInstance } from "utils/axiosInstance";
import { getMyClubMeetUpRefreshState } from "components/Home/redux/selectors";
import { setMyClubMeetUpRefresh } from "components/Home/redux/actions";

export default function MySubscribeClubListMeetUpListItem({
  clubId,
}: {
  clubId: number;
}) {
  const token = useSelector(getUserToken);
  const myClubMeetUpRefreshState = useSelector(getMyClubMeetUpRefreshState);
  const dispatch = useDispatch();
  const [meetupList, setMeetupList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null && myClubMeetUpRefreshState == true) {
      axiosInstance({
        url: "/meeting/read/list",
        method: "GET",
        headers: {
          Authorization: token.accessToken,
        },
        params: {
          clubId: clubId,
          pageScale: 10,
          offset: 0,
        },
      })
        .then((response) => {
          setMeetupList(response.data);
          dispatch(setMyClubMeetUpRefresh(false));
        })
        .catch(() => {
          Alert.alert("내가 구독한 동아리의 모임을 불러올 수 없습니다.", "", [
            {
              text: "확인",
            },
          ]);
        });
    }
  }, [myClubMeetUpRefreshState]);

  return (
    <>
      {typeof meetupList !== "undefined" && meetupList.length !== 0 && (
        <MeetupCardList
          title={`내가 구독한 "${meetupList[0].clubName}"의 모임`}
          meetupList={meetupList}
        />
      )}
    </>
  );
}
