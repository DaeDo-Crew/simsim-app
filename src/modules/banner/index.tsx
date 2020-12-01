import { Banner as RnpBanner } from "react-native-paper";
import * as React from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBannerState } from "./redux/selectors";
import { showBanner } from "./redux/actions";
import theme from "theme";

export default function Banner() {
  const bannerState = useSelector(getBannerState);
  const dispatch = useDispatch();

  const handleDismissBanner = () => {
    dispatch(showBanner(null));
  };
  return (
    <>
      {bannerState !== null && bannerState.visible == true && (
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
          contentStyle={{
            backgroundColor: theme.colors.ligthGrey,
          }}
          icon={({ size }) => (
            <Image
              source={
                typeof bannerState.iconUri !== "undefined"
                  ? {
                      uri: bannerState.iconUri,
                    }
                  : require("../../../assets/kakaoTalk.png")
              }
              style={{
                borderRadius: theme.borderRadius,
                width: size,
                height: size,
              }}
            />
          )}
        >
          {bannerState.descriptionText}
        </RnpBanner>
      )}
    </>
  );
}
