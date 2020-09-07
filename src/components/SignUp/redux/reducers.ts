import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import {
  setSignUpLoginId,
  setSignUpPassword,
  setSignUpEmail,
  setSignUpNickname,
} from "./actions";

const reducer = combineReducers({
  loginId: createReducer<string | null>(null).handleAction(
    setSignUpLoginId,
    (_state, action) => {
      return action.payload;
    }
  ),
  password: createReducer<string | null>(null).handleAction(
    setSignUpPassword,
    (_state, action) => {
      return action.payload;
    }
  ),
  email: createReducer<string | null>(null).handleAction(
    setSignUpEmail,
    (_state, action) => {
      return action.payload;
    }
  ),
  nickname: createReducer<string | null>(null).handleAction(
    setSignUpNickname,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
