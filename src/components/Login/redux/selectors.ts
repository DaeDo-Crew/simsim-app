import { RootState } from "redux/types";

export const getUserToken = (state: RootState) => state.login.userToken;
