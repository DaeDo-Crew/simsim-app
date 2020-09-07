import { RootState } from "redux/types";

export const getUserSignUpPayload = (state: RootState) => ({
  loginId: state.signUp.loginId,
  password: state.signUp.password,
  email: state.signUp.email,
  nickname: state.signUp.nickname,
});
