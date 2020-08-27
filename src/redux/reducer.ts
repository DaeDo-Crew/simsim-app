import { combineReducers } from "redux";
import homeReducer from "components/Home/redux/reducers";

export default combineReducers({
  home: homeReducer,
});
