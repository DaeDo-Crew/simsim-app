import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setUserToken } from "./actions";
import { UserTokenType } from "./types";

const reducer = combineReducers({
  userToken: createReducer<UserTokenType | null>(null).handleAction(
    setUserToken,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
