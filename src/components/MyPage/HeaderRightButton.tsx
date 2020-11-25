import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "components/Login/redux/actions";
import axios from "axios";
import { getUserToken } from "components/Login/redux/selectors";
import { LOGOUT_URL } from "./apiUrls";
import qs from "qs";

export default function HeaderRightButton() {
  const dispatch = useDispatch();

  const userToken = useSelector(getUserToken);

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
    <MaterialCommunityIcons
      name="logout"
      size={theme.size.headerIconSize}
      onPress={handleLogout}
      color={theme.colors.black}
      style={HeaderRightStyles.icon}
    />
  );
}
