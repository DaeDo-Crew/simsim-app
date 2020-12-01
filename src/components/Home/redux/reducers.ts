import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import {
  setMeetUpId,
  setMyMeetUpRefresh,
  setMyClubMeetUpRefresh,
} from "./actions";

const reducer = combineReducers({
  meetUpId: createReducer<string | null>(null).handleAction(
    setMeetUpId,
    (_state, action) => {
      return action.payload;
    }
  ),
  myMeetUpRefresh: createReducer(false).handleAction(
    setMyMeetUpRefresh,
    (_state, action) => {
      return action.payload;
    }
  ),
  myClubMeetUpRefresh: createReducer(false).handleAction(
    setMyClubMeetUpRefresh,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
