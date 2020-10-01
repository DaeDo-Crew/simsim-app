import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import CategoryButton from "./CategoryButton";
import MeetupCardList from "./MeetupCardList";
import { Button, Toast, Portal } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "components/Login/redux/actions";
import axios from "axios";
import { getUserToken } from "components/Login/redux/selectors";
import { LOGOUT_URL } from "./apiUrls";
import qs from "qs";


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

    console.log(userToken);
    
    if (userToken !== null) {
      const toastKey = Toast.loading("로그아웃 하는 중...");
      axios
        .post(LOGOUT_URL, qs.stringify({
          access_token: userToken.accessToken, 
        }))
        .then(() => {
          Portal.remove(toastKey);
          dispatch(setUserLogout(null));
        })
        .catch(() => Portal.remove(toastKey));
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
