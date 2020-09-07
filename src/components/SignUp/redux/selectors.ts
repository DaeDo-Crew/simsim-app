import { RootState } from "redux/types";

export const getUserSignUpPayload = (state: RootState) => {
  state.signUp.loginId;
  state.signUp.password;
  state.signUp.email;
  state.signUp.nickname;
};
