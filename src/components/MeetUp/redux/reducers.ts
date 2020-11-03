import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setMeetUpList } from "./actions";
import { MeetUpItem } from "./types";

const reducer = combineReducers({
  meetUpList: createReducer<MeetUpItem[] | null>(null).handleAction(
    setMeetUpList,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
