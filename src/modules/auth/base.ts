import { StyleSheet } from "react-native";
import theme from "theme";

export const AuthStyles = StyleSheet.create({
  container: {
    marginTop: 64,
    justifyContent: "center",
  },
  button: {
    borderWidth: 0,
  },
  mainButtonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  subButtonText: {
    color: theme.colors.darkGrey,
  },
});
