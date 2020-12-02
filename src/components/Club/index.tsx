import * as React from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import ClubCard from "./ClubCard";
import ClubNotice from "./ClubNotice";
import { MeetUpItem } from "components/MeetUp/redux/types";
import { axiosInstance } from "utils/axiosInstance";
import MeetupCardList from "components/Home/MeetupCardList";

type ClubProps = {
  key: string;
  name: string;
  params: {
    club_id: number;
    club_name: string;
  };
};

export default function Club({ route }: { route: ClubProps }) {
  const { club_id, club_name } = route.params;
  const navigation = useNavigation();
  const token = useSelector(getUserToken);
  const [meetupList, setMeetupList] = React.useState<MeetUpItem[]>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${club_name}의 소개`,
    });
  });

  React.useEffect(() => {
    if (token !== null) {
      axiosInstance({
        url: "/meeting/read/list",
        method: "GET",
        headers: {
          Authorization: token.accessToken,
        },
        params: {
          clubId: club_id,
          pageScale: 10,
          offset: 0,
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
    <AppLayout>
      <ScrollView>
        <View style={ClubStyles.container}>
          <ClubCard clubId={club_id} />
        </View>
        {typeof meetupList !== "undefined" && (
          <MeetupCardList
            title={`${club_name}이 주최한 모임`}
            meetupList={meetupList}
          />
        )}
        <ClubNotice club_id={club_id} />
      </ScrollView>
    </AppLayout>
  );
}

const ClubStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
