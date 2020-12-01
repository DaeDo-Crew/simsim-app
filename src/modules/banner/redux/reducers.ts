import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { showBanner } from "./actions";
import { BannerPayload } from "./types";

const reducer = combineReducers({
  state: createReducer<BannerPayload | null>(null).handleAction(
    showBanner,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
