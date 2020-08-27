import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setMeetUpId } from "./actions";

const reducer = combineReducers({
  meetUpId: createReducer<string | null>(null).handleAction(
    setMeetUpId,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
