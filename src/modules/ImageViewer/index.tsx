import * as React from "react";
import { Modal } from "react-native";
import { useSelector } from "react-redux";
import { getImageViewerState } from "./redux/selectors";
import ImageViewer from "react-native-image-zoom-viewer";

export default function MeetUpImageViewer() {
  const imageViewerState = useSelector(getImageViewerState);
  return (
    <>
      {imageViewerState !== null && (
        <Modal visible={imageViewerState.visible} transparent={true}>
          <ImageViewer
            imageUrls={imageViewerState.images}
            index={imageViewerState.selectedIndex}
          />
        </Modal>
      )}
    </>
  );
}
