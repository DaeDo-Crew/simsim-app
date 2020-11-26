import * as React from "react";
import { Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getImageViewerState } from "./redux/selectors";
import ImageViewer from "react-native-image-zoom-viewer";
import { showImageViewer } from "./redux/actions";

export default function MeetUpImageViewer() {
  const dispatch = useDispatch();
  const imageViewerState = useSelector(getImageViewerState);

  const handleImageSwipeDown = () => {
    dispatch(
      showImageViewer({ visible: false, images: null, selectedIndex: null })
    );
  };
  return (
    <>
      {imageViewerState !== null && (
        <Modal visible={imageViewerState.visible} transparent={true}>
          {imageViewerState.images !== null &&
            imageViewerState.selectedIndex !== null && (
              <ImageViewer
                imageUrls={imageViewerState.images}
                index={imageViewerState.selectedIndex}
                enableSwipeDown={true}
                onSwipeDown={handleImageSwipeDown}
              />
            )}
        </Modal>
      )}
    </>
  );
}
