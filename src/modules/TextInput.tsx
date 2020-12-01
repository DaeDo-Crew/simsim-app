import * as React from "react";
import { StyleSheet } from "react-native";
import {
  TextInput as RnpTextInput,
  HelperText as RnpHelpText,
} from "react-native-paper";
import theme from "theme";

type TextInputProps = {
  label?: string;
  onChangeText: ((text: string) => void) & Function;
  value: string;
  placeholder: string;
  textContentType?:
    | "username"
    | "password"
    | "emailAddress"
    | "newPassword"
    | "none"
    | "nickname";
  secureTextEntry?: boolean;
  style?: object;
  errorMessage?: string;
  touched?: boolean;
};

export default function TextInput(props: TextInputProps) {
  const {
    onChangeText,
    label,
    value,
    placeholder,
    textContentType,
    secureTextEntry,
    errorMessage,
    style,
    touched,
  } = props;
  return (
    <>
      <RnpTextInput
        mode="outlined"
        label={label}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        error={typeof errorMessage !== "undefined" && !touched}
        style={[TextInputStyles.textInput, style]}
      />
      <RnpHelpText
        type="error"
        visible={typeof errorMessage !== "undefined" && touched}
      >
        {errorMessage}
      </RnpHelpText>
    </>
  );
}

const TextInputStyles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.white,
  },
});
