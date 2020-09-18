import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setMeetUpId, setMeetUpList } from "./actions";
import { MeetupCard } from './types';

const reducer = combineReducers({
  meetUpId: createReducer<string | null>(null).handleAction(
    setMeetUpId,
    (_state, action) => {
      return action.payload;
    }
  ),
  meetUpList: createReducer<MeetupCard | null>(null).handleAction(
    setMeetUpList,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
