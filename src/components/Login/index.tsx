import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { StyleSheet, View, Text } from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import { useFormik } from "formik";
import axios from "axios";
import { setUserToken } from "./redux/actions";
import { LoginResponse } from "./redux/types";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_URL } from "./apiUrls";
import {
  Toast,
  Portal,
  Button,
  WingBlank,
  WhiteSpace,
} from "@ant-design/react-native";
import theme from "theme";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "로그인",
    });
  });

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { id: "", password: "" },
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
    navigation.navigate("SignUp");
  };
  return (
    <AppLayout>
      <WingBlank>
        <View style={LoginStyles.container}>
          <TextareaItem
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="아이디"
          />
          <WhiteSpace size="xl" />
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드"
          />
          <WhiteSpace size="xl" />
          <View style={LoginStyles.mainButtonContainer}>
            {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
            <Button onPress={handleSubmit as any} style={LoginStyles.button}>
              <Text style={LoginStyles.loginButtonText}>로그인</Text>
            </Button>
            <WhiteSpace size="xl" />
            <View style={LoginStyles.subButtonContainer}>
              <Button
                onPress={handleSignupButtonClicked}
                style={LoginStyles.button}
              >
                <Text style={LoginStyles.subButtonText}>회원가입</Text>
              </Button>
              <Button
                onPress={handleSignupButtonClicked}
                style={LoginStyles.button}
              >
                <Text style={LoginStyles.subButtonText}>아이디 찾기</Text>
              </Button>
              <Button
                onPress={handleSignupButtonClicked}
                style={LoginStyles.button}
              >
                <Text style={LoginStyles.subButtonText}>비밀번호 찾기</Text>
              </Button>
            </View>
          </View>
        </View>
      </WingBlank>
    </AppLayout>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    marginTop: 128,
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
  loginButtonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  subButtonText: {
    color: theme.colors.darkGrey,
  },
});
