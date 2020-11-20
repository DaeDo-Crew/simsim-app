import { StyleSheet } from "react-native";
import theme from "theme";

export const AuthStyles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    justifyContent: "center",
  },
  introContainer: {
    marginVertical: 64,
  },
  introText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 32,
  },
  textInputContainer: {
    marginTop: 16,
  },
  textInput: {
    backgroundColor: theme.colors.white,
  },
  mainButtonContainer: {
    alignItems: "center",
    marginTop: 32,
  },
});
