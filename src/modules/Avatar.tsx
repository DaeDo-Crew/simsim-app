import * as React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "theme";

type Props = {
  size: number;
};

export default function Avatar(props: Props) {
  const { size } = props;
  const avatarStyles = getAvatarStyles({ size });
  return (
    <View style={avatarStyles.AvatarContainer}>
      <AntDesign name="user" size={size} color={theme.colors.white} />
    </View>
  );
}

const getAvatarStyles = (props: Props) => {
  const { size } = props;
  return StyleSheet.create({
    AvatarContainer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.colors.primary,
    },
  });
};
