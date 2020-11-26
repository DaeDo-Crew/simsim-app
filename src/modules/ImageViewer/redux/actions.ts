import { createAction } from "typesafe-actions";
import { ImageViewerData } from "./types";

export const showImageViewer = createAction(
  "SHOW_IMAGEVIEWER"
)<ImageViewerData>();
