import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { setUserValid } from "./actions";

const reducer = combineReducers({
  userValid: createReducer<boolean>(false).handleAction(
    setUserValid,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
