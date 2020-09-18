import { combineReducers } from "redux";
import homeReducer from "components/Home/redux/reducers";
import loginReducer from "components/Login/redux/reducers";
import signUpReducer from "components/SignUp/redux/reducers";
import meetUpReducer from "components/MeetUp/redux/reducers";

export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  signUp: signUpReducer,
  meetUp: meetUpReducer,
});
