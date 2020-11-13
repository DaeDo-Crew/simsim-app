import * as React from "react";
import AppLayout from "modules/AppLayout";
import { View, StyleSheet } from "react-native";
import TextInput from "modules/TextInput";
import Button from "modules/Button";
import { useNavigation } from "@react-navigation/native";
import qs from "qs";
import axios from "axios";
import { useFormik } from "formik";
import { AuthStyles } from "modules/auth/base";
import { FindPwRequest } from "./redux/types";
import { findPwRequestSchema } from "./schemas";
import { FIND_PW } from "./apiUrls";
import { usePasswordConfirm } from "modules/auth/hooks";

export default function FindPassword() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "비밀번호 재설정",
    });
  });

  const { values, errors, handleSubmit, handleChange } = useFormik<
    FindPwRequest
  >({
    initialValues: { email: "", loginId: "", newqw: "" },
    validationSchema: findPwRequestSchema,
    onSubmit: async (value) => {
      if (!validatePasswordConfirm()) {
      } else {
        setIsSubmitting(true);
        await axios
          .post<boolean>(
            FIND_PW,
            qs.stringify({
              email: value.email,
              loginId: value.loginId,
              newqw: value.newqw,
            })
          )
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log(error.response.data);
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      }
    },
  });

  const {
    passwordConfirm,
    passwordConfirmError,
    validatePasswordConfirm,
    handlePasswordConfirmChange,
  } = usePasswordConfirm(values.newqw);

  return (
    <AppLayout>
      <View>
        <View style={FindPasswordStyles.container}>
          <TextInput
            label="학교 이메일"
            onChangeText={handleChange("email")}
            value={values.email}
            placeholder="sshz@uos.ac.kr"
            textContentType="emailAddress"
            error={typeof errors.email !== "undefined"}
          />
        </View>
        <View style={FindPasswordStyles.container}>
          <TextInput
            label="새로운 비밀번호"
            onChangeText={handleChange("newqw")}
            value={values.newqw}
            placeholder="9자리 이상 영문 + 숫자"
            textContentType="newPassword"
            error={typeof errors.newqw !== "undefined"}
          />
        </View>
        <View style={FindPasswordStyles.container}>
          <TextInput
            label="새로운 비밀번호를 한번 더 입력해주세요."
            onChangeText={handlePasswordConfirmChange}
            value={passwordConfirm}
            placeholder="9자리 이상 영문 + 숫자"
            textContentType="none"
            secureTextEntry={true}
            error={passwordConfirmError !== ""}
          />
        </View>
        <View style={AuthStyles.mainButtonContainer}>
          <Button
            type="contained"
            onPress={handleSubmit}
            disabled={
              typeof errors !== "undefined" && passwordConfirmError !== ""
            }
            isSubmitting={isSubmitting}
            label="비밀번호 재설정"
          />
        </View>
      </View>
    </AppLayout>
  );
}

const FindPasswordStyles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginHorizontal: 32,
  },
});
