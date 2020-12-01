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
import { getRefreshState } from "./redux/selectors";
import { setMeetUpRefresh } from "./redux/actions";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refreshState = useSelector(getRefreshState);

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

  return (
    <AppLayout>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshState}
            onRefresh={() => dispatch(setMeetUpRefresh(true))}
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
