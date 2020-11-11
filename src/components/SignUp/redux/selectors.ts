import { RootState } from "redux/types";

export const getUserSignUpPayload = (state: RootState) => ({
  loginId: state.signUp.loginId,
  password: state.signUp.password,
  email: state.signUp.email,
  emailCode: state.signUp.emailCode,
  nickname: state.signUp.nickname,
});
