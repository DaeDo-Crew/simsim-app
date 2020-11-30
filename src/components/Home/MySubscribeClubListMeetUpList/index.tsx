import * as React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { axiosInstance } from "utils/axiosInstance";
import MySubscribeClubListMeetUpListItem from "./MySubscribeClubListMeetUpListItem";

export default function MySubscribeClubListMeetUpList() {
  const token = useSelector(getUserToken);

  const [myClubSubscribeList, setMyClubSubscribeList] = React.useState<
    number[]
  >();

  React.useEffect(() => {
    if (token !== null) {
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
  }, []);

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
