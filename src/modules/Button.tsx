import * as React from "react";
import { StyleSheet } from "react-native";
import { Button as RnpButton } from "react-native-paper";
import theme from "theme";

type ButtonProps = {
  type: "text" | "outlined" | "contained";
  label: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  onPress: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  compact?: boolean;
  style?: object;
};

export default function Button(props: ButtonProps) {
  const {
    type,
    label,
    isSubmitting,
    onPress,
    disabled,
    compact,
    style,
  } = props;
  return (
    <RnpButton
      mode={type}
      loading={isSubmitting}
      disabled={disabled}
      compact={compact}
      contentStyle={ButtonStyles.buttonContainer}
      labelStyle={[
        type == "contained"
          ? ButtonStyles.containedLabelStyle
          : ButtonStyles.textLabelStyle,
        style,
      ]}
      onPress={onPress}
    >
      {label}
    </RnpButton>
  );
}

const ButtonStyles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containedLabelStyle: {
    fontSize: 16,
    fontWeight: "700",
  },
  textLabelStyle: {
    letterSpacing: 3,
    fontSize: 16,
    color: theme.colors.darkGrey,
  },
});
