import * as React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import MeetupCardList from "./MeetupCardList";
import ClubList from "./ClubList";
import HeaderRightButton from "./HeaderRightButton";

export default function Home() {
  const navigation = useNavigation();

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
      <ScrollView>
        <MeetupCardList />
        <ClubList />
      </ScrollView>
    </AppLayout>
  );
}
