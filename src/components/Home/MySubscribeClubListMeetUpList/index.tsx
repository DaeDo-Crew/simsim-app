import * as React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { axiosInstance } from "utils/axiosInstance";
import MySubscribeClubListMeetUpListItem from "./MySubscribeClubListMeetUpListItem";
import { getMyClubMeetUpRefreshState } from "components/Home/redux/selectors";

export default function MySubscribeClubListMeetUpList() {
  const token = useSelector(getUserToken);
  const myClubMeetUpRefreshState = useSelector(getMyClubMeetUpRefreshState);

  const [myClubSubscribeList, setMyClubSubscribeList] = React.useState<
    number[]
  >();

  React.useEffect(() => {
    if (token !== null && myClubMeetUpRefreshState == true) {
      axiosInstance({
        url: "/club/SubClubList",
        method: "GET",
        headers: {
          Authorization: token.accessToken,
        },
      })
        .then((response) => {
          setMyClubSubscribeList(response.data);
        })
        .catch(() => {
          Alert.alert("내가 구독한 동아리 정보를 불러올 수 없습니다.", "", [
            {
              text: "확인",
            },
          ]);
        });
    }
  }, [myClubMeetUpRefreshState]);

  return (
    <>
      {typeof myClubSubscribeList !== "undefined" &&
        myClubSubscribeList.map((clubId) => {
          return (
            <MySubscribeClubListMeetUpListItem key={clubId} clubId={clubId} />
          );
        })}
    </>
  );
}
