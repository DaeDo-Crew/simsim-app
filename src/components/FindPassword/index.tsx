import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { View, StyleSheet, Alert } from "react-native";
import TextInput from "modules/TextInput";
import Button from "modules/Button";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { AuthStyles } from "modules/auth/base";
import { FindPwRequest } from "./redux/types";
import { findPwRequestSchema } from "./schemas";
import { usePasswordConfirm } from "modules/auth/hooks";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { axiosInstance } from "utils/axiosInstance";

export default function FindPassword() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "비밀번호 변경",
    });
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting,
    isValid,
  } = useFormik<FindPwRequest>({
    initialValues: { email: "", newqw: "" },
    validationSchema: findPwRequestSchema,
    onSubmit: async (value) => {
      if (!validatePasswordConfirm() && isValid) {
      } else {
        await axiosInstance({
          method: "PATCH",
          url: "/member/searchPw",
          params: {
            email: value.email,
            newqw: value.newqw,
          },
        })
          .then(() => {
            navigation.navigate("Login");
            dispatch(
              showSnackbar({
                visible: true,
                message: "비밀번호를 재설정했습니다.",
              })
            );
          })
          .catch((error) => {
            Alert.alert("다시 시도해주세요.", `${error.response.data}`, [
              {
                text: "확인",
              },
            ]);
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
      <View style={FindPasswordStyles.container}>
        <TextInput
          label="서울시립대학교 포털이메일"
          onChangeText={handleChange("email")}
          value={values.email}
          placeholder="sshz@uos.ac.kr"
          textContentType="emailAddress"
          errorMessage={errors.email}
          style={FindPasswordStyles.textInput}
        />
        <TextInput
          label="새로운 비밀번호"
          onChangeText={handleChange("newqw")}
          value={values.newqw}
          placeholder="9자리 이상 영문 + 숫자"
          textContentType="newPassword"
          secureTextEntry={true}
          errorMessage={errors.newqw}
          style={FindPasswordStyles.textInput}
        />
        <TextInput
          label="새로운 비밀번호를 한번 더 입력해주세요."
          onChangeText={handlePasswordConfirmChange}
          value={passwordConfirm}
          placeholder="9자리 이상 영문 + 숫자"
          textContentType="none"
          secureTextEntry={true}
          errorMessage={passwordConfirmError}
          style={FindPasswordStyles.textInput}
        />
        <View style={AuthStyles.mainButtonContainer}>
          <Button
            type="contained"
            onPress={handleSubmit}
            isSubmitting={isSubmitting}
            label="비밀번호 변경"
          />
        </View>
      </View>
    </AppLayout>
  );
}

const FindPasswordStyles = StyleSheet.create({
  container: {
    marginVertical: 32,
    marginHorizontal: 32,
  },
  textInput: {
    marginBottom: 16,
  },
});
