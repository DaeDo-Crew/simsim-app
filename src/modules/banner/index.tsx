import { Banner as RnpBanner } from "react-native-paper";
import * as React from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBannerState } from "./redux/selectors";
import { showBanner } from "./redux/actions";

export default function Banner() {
  const bannerState = useSelector(getBannerState);
  const dispatch = useDispatch();

  const handleDismissBanner = () => {
    dispatch(showBanner(null));
  };
  return (
    <>
      {bannerState !== null && (
        <RnpBanner
          visible={bannerState.visible}
          actions={[
            {
              label: bannerState.confirmLabel,
              onPress: bannerState.onPressConfirm,
            },
            {
              label: "취소",
              onPress: handleDismissBanner,
            },
          ]}
        >
          {bannerState.descriptionText}
        </RnpBanner>
      )}
    </>
  );
}
