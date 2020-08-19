import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import CategoryButton from "./CategoryButton";
import MeetupCardList from "./MeetupCardList";

const CATEGORY = [
  {
    key: 1,
    name: "동아리 유형",
  },
  {
    key: 2,
    name: "모임 위치",
  },
  {
    key: 3,
    name: "모임 기간",
  },
  {
    key: 4,
    name: "동아리 이름",
  },
];

const style = StyleSheet.create({
  CategoryButtonContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default function Home() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "홈",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <View style={style.CategoryButtonContainer}>
          {CATEGORY.map((item) => {
            return <CategoryButton key={item.key}>{item.name}</CategoryButton>;
          })}
        </View>
        <View>
          <MeetupCardList />
        </View>
      </ScrollView>
    </AppLayout>
  );
}
