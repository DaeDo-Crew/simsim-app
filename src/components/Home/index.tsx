import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import CategoryButton from "./CategoryButton";
import MeetupCardList from "./MeetupCardList";
import { Button } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "components/Login/redux/actions";
import axios from "axios";
import { getUserToken } from "components/Login/redux/selectors";
import { LOGOUT_URL } from "./apiUrls";

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
  const dispatch = useDispatch();

  const userToken = useSelector(getUserToken);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "홈",
    });
  });

  const handleLogout = () => {
    if (userToken !== null) {
      axios
        .get(LOGOUT_URL, {
          params: {
            access_token: userToken.accessToken,
          },
        })
        .then(() => {
          dispatch(setUserLogout(null));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <AppLayout>
      <ScrollView>
        <Button onPress={handleLogout}>임시 로그아웃 버튼</Button>
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
