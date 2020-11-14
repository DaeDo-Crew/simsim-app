import * as homeAction from "components/Home/redux/actions";
import * as loginAction from "components/Login/redux/actions";
import * as meetUpAction from "components/MeetUp/redux/actions";
import * as SnackbarAction from "modules/Snackbar/redux/actions";

export default {
  home: homeAction,
  login: loginAction,
  meetUp: meetUpAction,
  snackbar: SnackbarAction,
};
