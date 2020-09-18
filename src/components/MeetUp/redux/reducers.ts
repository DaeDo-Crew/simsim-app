import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import {
  getMeetingItemList
} from "./actions";

const reducer = combineReducers({
  data: createReducer<string | null>(null)
  .handleAction(getMeetingItemList, (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
