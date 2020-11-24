import * as React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import MeetupCardList from "./MeetupCardList";
import ClubList from "./ClubList";
// import { showSnackbar } from "modules/Snackbar/redux/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserLogout } from "components/Login/redux/actions";
// import axios from "axios";
// import { getUserToken } from "components/Login/redux/selectors";
// import { LOGOUT_URL } from "./apiUrls";
// import qs from "qs";
import HeaderRightButton from "./HeaderRightButton";

export default function Home() {
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  // const userToken = useSelector(getUserToken);

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

  // const handleLogout = () => {
  //   if (userToken !== null) {
  //     axios
  //       .post(
  //         LOGOUT_URL,
  //         qs.stringify({
  //           access_token: userToken.accessToken,
  //         })
  //       )
  //       .then(() => {
  //         dispatch(
  //           showSnackbar({ visible: true, message: "로그아웃 했습니다." })
  //         );
  //         dispatch(setUserLogout(null));
  //       })
  //       .catch(() => {
  //         showSnackbar({ visible: true, message: "로그아웃에 실패 했습니다." });
  //       });
  //   }
  // };

  return (
    <AppLayout>
      <ScrollView>
        <MeetupCardList />
        <ClubList />
      </ScrollView>
    </AppLayout>
  );
}
