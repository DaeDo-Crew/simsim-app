import { RootState } from "redux/types";

export const getMeetUpId = (state: RootState) => state.home.meetUpId;

export const getMyMeetUpRefreshState = (state: RootState) =>
  state.home.myMeetUpRefresh;

export const getMyClubMeetUpRefreshState = (state: RootState) =>
  state.home.myClubMeetUpRefresh;
