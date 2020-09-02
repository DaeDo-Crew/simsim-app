import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setUserToken } from "./actions";
import { LoginResponse } from "./types";

const reducer = combineReducers({
  userToken: createReducer<LoginResponse | null>(null).handleAction(
    setUserToken,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
