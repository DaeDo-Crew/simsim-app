import * as homeAction from "components/Home/redux/actions";
import * as loginAction from "components/Login/redux/actions";
import * as SnackbarAction from "modules/Snackbar/redux/actions";
import * as ImageViewerAction from "modules/ImageViewer/redux/actions";

export default {
  home: homeAction,
  login: loginAction,
  snackbar: SnackbarAction,
  imageViewer: ImageViewerAction,
};
