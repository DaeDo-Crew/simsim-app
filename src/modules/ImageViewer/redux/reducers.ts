import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { showImageViewer } from "./actions";
import { ImageViewerData } from "./types";

const reducer = combineReducers({
  state: createReducer<ImageViewerData | null>(null).handleAction(
    showImageViewer,
    (_state, action) => {
      return action.payload;
    }
  ),
});

export default reducer;
