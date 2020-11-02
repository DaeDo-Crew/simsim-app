import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import { setUserToken, setUserLogout } from "./actions";
import { LoginResponse } from "./types";

const reducer = combineReducers({
  userToken: createReducer<LoginResponse>({ accessToken: null })
    .handleAction(setUserToken, (_state, action) => {
      return action.payload;
    })
    .handleAction(setUserLogout, (_state, _action) => {
      return {
        accessToken: null,
      };
    }),
});

export default reducer;
