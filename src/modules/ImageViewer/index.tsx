import * as React from "react";
import { Modal, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getImageViewerState } from "./redux/selectors";
import ImageViewer from "react-native-image-zoom-viewer";
import { showImageViewer } from "./redux/actions";
import { StatusBar } from "expo-status-bar";
import theme from "theme";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ImageViewerFooter = () => {
  const dispatch = useDispatch();

  const handleImageSwipeDown = () => {
    dispatch(
      showImageViewer({ visible: false, images: null, selectedIndex: null })
    );
  };

  return (
    <SafeAreaView edges={["bottom"]}>
      <View style={{ flexDirection: "row-reverse" }}>
        <IconButton
          icon="close"
          color={theme.colors.white}
          onPress={handleImageSwipeDown}
        />
      </View>
    </SafeAreaView>
  );
};

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
                pageAnimateTime={200}
                swipeDownThreshold={80}
                renderFooter={() => <ImageViewerFooter />}
              />
            )}
          <StatusBar style="light" />
        </Modal>
      )}
    </>
  );
}
