import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "components/Login/redux/actions";
import { getUserToken } from "components/Login/redux/selectors";
import { axiosInstance } from "utils/axiosInstance";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderRightButton() {
  const dispatch = useDispatch();

  const userToken = useSelector(getUserToken);

  const handleLogoutButonClick = () => {
    Alert.alert("정말 로그아웃 하시겠습니까?", "", [
      {
        text: "네",
        onPress: handleLogout,
        style: "destructive",
      },
      {
        text: "아니오",
        style: "cancel",
      },
    ]);
  };

  const handleLogout = () => {
    if (userToken.accessToken !== null) {
      axiosInstance({
        url: "/member/logout",
        method: "POST",
        params: {
          access_token: userToken.accessToken,
        },
      })
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
    <Ionicons
      name="md-log-out"
      size={theme.size.headerIconSize}
      onPress={handleLogoutButonClick}
      color={theme.colors.black}
      style={HeaderRightStyles.icon}
    />
  );
}
