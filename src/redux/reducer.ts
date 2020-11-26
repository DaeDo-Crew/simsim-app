import { combineReducers } from "redux";
import homeReducer from "components/Home/redux/reducers";
import loginReducer from "components/Login/redux/reducers";
import snackbarReducer from "modules/Snackbar/redux/reducers";

export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  snackbar: snackbarReducer,
});
