import * as React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import MeetupCardList from "./MeetupCardList";
import { Button, Toast, Portal } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "components/Login/redux/actions";
import axios from "axios";
import { getUserToken } from "components/Login/redux/selectors";
import { LOGOUT_URL } from "./apiUrls";
import qs from "qs";

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
      const toastKey = Toast.loading("로그아웃 하는 중...");
      axios
        .post(
          LOGOUT_URL,
          qs.stringify({
            access_token: userToken.accessToken,
          })
        )
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
        <View>
          <MeetupCardList />
        </View>
      </ScrollView>
    </AppLayout>
  );
}
