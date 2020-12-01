import * as React from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MeetUpItem } from "components/MeetUp/redux/types";
import MeetupCardList from "./MeetupCardList";
import { axiosInstance } from "utils/axiosInstance";
import { setMyMeetUpRefresh } from "./redux/actions";

export default function AllMeetUpList() {
  const token = useSelector(getUserToken);
  const dispatch = useDispatch();
  const [meetupList, setMeetupList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null) {
      axiosInstance({
        url: "/meeting/read/list",
        method: "GET",
        headers: {
          Authorization: token.accessToken,
        },
        params: {
          pageScale: 10,
          offset: 0,
        },
      })
        .then((response) => {
          setMeetupList(response.data.reverse());
          dispatch(setMyMeetUpRefresh(false));
        })
        .catch(() => {
          Alert.alert("전체 모임을 불러올 수 없습니다.", "", [
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
        <MeetupCardList title="전체 모임" meetupList={meetupList} />
      )}
    </>
  );
}
