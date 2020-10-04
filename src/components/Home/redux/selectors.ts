import { RootState } from "redux/types";

export const getMeetUpId = (state: RootState) => state.home.meetUpId;

export const getMeetUpList = (state: RootState) => state.home.meetUpList;
