import { RootState } from "redux/types";

export const getMeetUpId = (state: RootState) => state.home.meetUpId;

export const getRefreshState = (state: RootState) => state.home.refresh;
