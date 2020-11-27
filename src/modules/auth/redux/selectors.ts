import { RootState } from "redux/types";

export const getUserValid = (state: RootState) => state.auth.userValid;
