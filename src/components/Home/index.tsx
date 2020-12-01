import * as React from "react";
import { ScrollView, View, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import CurrentMeetUpList from "./CurrentMeetUpList";
import MyMeetUpList from "./MyMeetUpList";
import MySubscribeClubListMeetUpList from "./MySubscribeClubListMeetUpList";
import ClubList from "./ClubList";
import HeaderRightButton from "./HeaderRightButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyMeetUpRefreshState,
  getMyClubMeetUpRefreshState,
} from "./redux/selectors";
import { setMyClubMeetUpRefresh, setMyMeetUpRefresh } from "./redux/actions";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myMeetUpRefreshState = useSelector(getMyMeetUpRefreshState);
  const myClubMeetUpRefreshState = useSelector(getMyClubMeetUpRefreshState);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "심심했지 🙋‍♀️",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      headerRight: () => <HeaderRightButton />,
    });
  });

  React.useEffect(() => {
    dispatch(setMyMeetUpRefresh(true));
    dispatch(setMyClubMeetUpRefresh(true));
  }, []);

  return (
    <AppLayout>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={myMeetUpRefreshState && myClubMeetUpRefreshState}
            onRefresh={() => {
              dispatch(setMyMeetUpRefresh(true));
              dispatch(setMyClubMeetUpRefresh(true));
            }}
          />
        }
      >
        <MyMeetUpList />
        <CurrentMeetUpList />
        <ClubList />
        <MySubscribeClubListMeetUpList />
        <View style={{ marginBottom: 32 }} />
      </ScrollView>
    </AppLayout>
  );
}
