import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "@ant-design/react-native";
import theme from "theme";

type CategoryButtonProps = {
  children: React.ReactNode;
};

const style = StyleSheet.create({
  CategoryButton: {
    borderWidth: 0,
    alignSelf: "flex-start",
    backgroundColor: `${theme.colors.secondary}`,
    borderRadius: theme.borderRadius,
  },
  CategoryButtonLabel: {
    color: `${theme.colors.black}`,
    fontSize: 13,
  },
});

export default function CategoryButton({ children }: CategoryButtonProps) {
  return (
    <Button style={style.CategoryButton}>
      <Text style={style.CategoryButtonLabel}>{children}</Text>
    </Button>
  );
}
