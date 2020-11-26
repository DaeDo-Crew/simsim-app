import { IImageInfo } from "react-native-image-zoom-viewer/src/image-viewer.type";

export type ImageViewerData = {
  images: IImageInfo[] | null;
  selectedIndex: number | null;
  visible: boolean;
};
