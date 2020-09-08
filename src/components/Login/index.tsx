import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { StyleSheet, View, Text } from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import { useFormik } from "formik";
import axios from "axios";
import { setUserToken } from "./redux/actions";
import { LoginResponse, LoginRequest } from "./redux/types";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_URL } from "./apiUrls";
import {
  Toast,
  Portal,
  Button,
  WingBlank,
  WhiteSpace,
} from "@ant-design/react-native";
import { AuthStyles } from "modules/auth/base";
import { loginRequestSchema } from "./schemas";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "🤫",
    });
  });

  const { values, errors, handleSubmit, handleChange } = useFormik<
    LoginRequest
  >({
    initialValues: { id: "", password: "" },
    validationSchema: loginRequestSchema,
    onSubmit: (value) => {
      const toastKey = Toast.loading("로그인 하는 중...");
      axios
        .get<LoginResponse>(LOGIN_URL, {
          params: {
            loginId: value.id,
            password: value.password,
          },
        })
        .then((response) => {
          Portal.remove(toastKey);
          dispatch(
            setUserToken({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
        })
        .catch(() => {
          Portal.remove(toastKey);
          Toast.fail("로그인에 실패했습니다.", 1);
        });
    },
  });

  const handleSignupButtonClicked = () => {
    navigation.navigate("PrimarySignUp");
  };

  return (
    <AppLayout>
      <WingBlank>
        <View style={AuthStyles.container}>
          <TextareaItem
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="아이디"
            error={typeof errors.id !== "undefined"}
          />
          <WhiteSpace size="xl" />
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드"
            error={typeof errors.password !== "undefined"}
          />
          <WhiteSpace size="xl" />
          <View style={LoginStyles.mainButtonContainer}>
            {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
            <Button onPress={handleSubmit as any} style={AuthStyles.button}>
              <Text style={AuthStyles.mainButtonText}>로그인</Text>
            </Button>
            <WhiteSpace size="xl" />
            <View style={LoginStyles.subButtonContainer}>
              <Button
                onPress={handleSignupButtonClicked}
                style={AuthStyles.button}
              >
                <Text style={AuthStyles.subButtonText}>회원가입</Text>
              </Button>
              <Button
                onPress={handleSignupButtonClicked}
                style={AuthStyles.button}
              >
                <Text style={AuthStyles.subButtonText}>아이디 찾기</Text>
              </Button>
              <Button
                onPress={handleSignupButtonClicked}
                style={AuthStyles.button}
              >
                <Text style={AuthStyles.subButtonText}>비밀번호 찾기</Text>
              </Button>
            </View>
          </View>
        </View>
      </WingBlank>
    </AppLayout>
  );
}

const LoginStyles = StyleSheet.create({
  mainButtonContainer: {
    alignItems: "center",
  },
  subButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
