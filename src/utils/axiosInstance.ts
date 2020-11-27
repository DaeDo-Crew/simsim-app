import axios from "axios";
import { setUserToken } from "components/Login/redux/actions";
import { setUserValid } from "modules/auth/redux/actions";
import createReduxStore from "redux/store";

const { store } = createReduxStore();

export const axiosInstance = axios.create({
  baseURL: "https://api.sshz.kr",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const state = store.getState();
      axiosInstance({
        method: "POST",
        url: "/member/retoken",
        params: {
          accessToken: state.login.userToken,
        },
      })
        .then((response) => {
          store.dispatch(
            setUserToken({
              accessToken: response.data.accessToken,
            })
          );
          store.dispatch(setUserValid(true));
        })
        .catch((error) => {
          console.log(error);
        });
      store.dispatch(setUserValid(true));
    }
  }
);
