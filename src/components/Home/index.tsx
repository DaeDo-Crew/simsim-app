import * as React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import MeetupCardList from "./MeetupCardList";
import Button from "modules/Button";
import { showSnackbar } from "modules/Snackbar/redux/actions";
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
      headerTitle: "심심했지 🙋‍♀️",
    });
  });

  const handleLogout = () => {
    if (userToken !== null) {
      axios
        .post(
          LOGOUT_URL,
          qs.stringify({
            access_token: userToken.accessToken,
          })
        )
        .then(() => {
          dispatch(
            showSnackbar({ visible: true, message: "로그아웃 했습니다." })
          );
          dispatch(setUserLogout(null));
        })
        .catch(() => {
          showSnackbar({ visible: true, message: "로그아웃에 실패 했습니다." });
        });
    }
  };

  return (
    <AppLayout>
      <ScrollView>
        <Button
          type="outlined"
          onPress={handleLogout}
          label="임시 로그아웃 버튼"
        />
        <View>
          <MeetupCardList />
        </View>
      </ScrollView>
    </AppLayout>
  );
}
