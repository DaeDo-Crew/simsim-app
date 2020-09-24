import { StyleSheet } from "react-native";
import theme from "theme";

export const AuthStyles = StyleSheet.create({
  container: {
    marginTop: 64,
    justifyContent: "center",
  },
  mainButtonContainer: {
    alignItems: "center",
  },
  subButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
