import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput as RnpTextInput } from "react-native-paper";
import theme from "theme";

type TextInputProps = {
  onChangeText: ((text: string) => void) & Function;
  value: string;
  placeholder: string;
  textContentType?:
    | "username"
    | "password"
    | "emailAddress"
    | "newPassword"
    | "none";
  secureTextEntry?: boolean;
  error?: boolean;
};

export default function TextInput(props: TextInputProps) {
  const {
    onChangeText,
    value,
    placeholder,
    textContentType,
    secureTextEntry,
    error,
  } = props;
  return (
    <RnpTextInput
      mode="outlined"
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType}
      error={error}
      style={TextInputStyles.textInput}
    />
  );
}

const TextInputStyles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.white,
  },
});
