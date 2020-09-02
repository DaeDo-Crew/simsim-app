import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { ScrollView, Button, StyleSheet, View } from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import { useFormik } from "formik";
import axios from "axios";
import { setUserToken } from "./redux/actions";
import { UserTokenType } from "./redux/types";

const LOGIN_URL =
  "http://ec2-3-35-88-123.ap-northeast-2.compute.amazonaws.com:8080/member/signin";

export default function Login() {
  const dispatch = useDispatch();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { id: "", password: "" },
    onSubmit: (value) => {
      axios
        .get<UserTokenType>(LOGIN_URL, {
          params: {
            loginId: value.id,
            password: value.password,
          },
        })
        .then((response) => {
          dispatch(
            setUserToken({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
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
