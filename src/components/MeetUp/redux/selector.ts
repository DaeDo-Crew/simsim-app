import { RootState } from "redux/types";

export const getMeetUpList = (state: RootState) => state.meetUp.meetUpList;
