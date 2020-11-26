import { RootState } from "redux/types";

export const getImageViewerState = (state: RootState) =>
  state.imageViewer.state;
