import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setMeetUpId, setMeetUpRefresh } from "./actions";

const reducer = combineReducers({
  meetUpId: createReducer<string | null>(null).handleAction(
    setMeetUpId,
    (_state, action) => {
      return action.payload;
    }
  ),
  refresh: createReducer(false).handleAction(
    setMeetUpRefresh,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
