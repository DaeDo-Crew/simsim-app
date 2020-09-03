import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { ScrollView, Button, StyleSheet, View } from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import { useFormik } from "formik";
import axios from "axios";
import { setUserToken } from "./redux/actions";
import { LoginResponse } from "./redux/types";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_URL } from "./apiUrls";
import { Toast, Portal } from "@ant-design/react-native";

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
        .catch((error) => {
          Portal.remove(toastKey);
          Toast.fail("로그인에 실패했습니다.", 1);
          console.log(error);
        });
    },
  });

  const handleSignupButtonClicked = () => {
    navigation.navigate("SignUp");
  };
  return (
    <AppLayout>
      <ScrollView>
        <View style={LoginStyles.container}>
          <TextareaItem
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="아이디"
          />
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드"
          />
          {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
          <Button onPress={handleSubmit as any} title="로그인" />
          <Button onPress={handleSignupButtonClicked} title="회원가입" />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
