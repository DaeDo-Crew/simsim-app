import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, View, Text } from "react-native";
import {
  TextareaItem,
  Button,
  Toast,
  Portal,
  WingBlank,
  WhiteSpace,
} from "@ant-design/react-native";
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "비밀번호 변경",
    });
  });

  const { values, errors, handleSubmit, handleChange } = useFormik<
    FindPwRequest
  >({
    initialValues: { email: "", loginId: "", newqw: "" },
    validationSchema: findPwRequestSchema,
    onSubmit: (value) => {
      if (!validatePasswordConfirm()) {
        Toast.fail("비밀번호와 비밀번호 확인이 일치하지 않습니다.", 1);
      } else {
        const toastKey = Toast.loading("비밀번호 변경 중...");
        axios
          .post<boolean>(
            FIND_PW,
            qs.stringify({
              email: value.email,
              loginId: value.loginId,
              newqw: value.newqw,
            })
          )
          .then(() => {
            Portal.remove(toastKey);
            navigation.navigate("Login");
          })
          .catch((error) => {
            Portal.remove(toastKey);
            Toast.fail(error.response.data, 1);
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
      <ScrollView>
        <WingBlank>
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="이메일"
              textContentType="emailAddress"
              error={typeof errors.email !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handleChange("loginId")}
              value={values.loginId}
              placeholder="아이디"
              textContentType="username"
              error={typeof errors.loginId !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handleChange("newqw")}
              value={values.newqw}
              placeholder="새로운 비밀번호"
              textContentType="newPassword"
              error={typeof errors.newqw !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handlePasswordConfirmChange}
              value={passwordConfirm}
              placeholder="비밀번호 확인"
              textContentType="none"
              secureTextEntry={true}
              error={passwordConfirmError !== ""}
            />
            <WhiteSpace size="xl" />
            <View style={AuthStyles.mainButtonContainer}>
              <Button
                style={AuthStyles.button}
                onPress={handleSubmit}
                disabled={
                  typeof errors !== "undefined" && passwordConfirmError !== ""
                }
              >
                <Text style={AuthStyles.mainButtonText}>비밀번호 변경</Text>
              </Button>
            </View>
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
