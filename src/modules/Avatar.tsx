import * as React from "react";
import { Avatar as RnpAvatar } from "react-native-paper";

type Props = {
  size: number;
  imageSource?: string | null;
};

export default function Avatar(props: Props) {
  const { size, imageSource } = props;
  return (
    <>
      {imageSource !== null ? (
        <RnpAvatar.Image size={size} source={{ uri: imageSource }} />
      ) : (
        <RnpAvatar.Icon size={size} icon="account-circle" />
      )}
    </>
  );
}
