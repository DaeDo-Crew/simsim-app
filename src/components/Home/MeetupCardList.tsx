import * as React from "react";
import { FlatList, Alert } from "react-native";
import axios from "axios";
import MeetupCardItem from "./MeetupCardItem";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { MEEING_LIST_URL } from "./apiUrls";
import CardListHeader from "modules/CardListHeader";
import { MeetUpItem } from "components/MeetUp/redux/types";

export default function MeetupCardList() {
  const token = useSelector(getUserToken);

  const [meetupList, setMeetupList] = React.useState<MeetUpItem[]>();

  React.useEffect(() => {
    if (token !== null) {
      axios
        .get(MEEING_LIST_URL, {
          headers: {
            Authorization: token.accessToken,
          },
        })
        .then((response) => {
          setMeetupList(response.data);
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
      {typeof meetupList !== "undefined" && (
        <>
          <CardListHeader listTitle="모집중인 모임" isViewAll={true} />
          <FlatList
            data={meetupList}
            renderItem={({ item }) => <MeetupCardItem item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.meetingId)}
          />
        </>
      )}
    </>
  );
}
