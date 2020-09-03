import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextareaItem, Button, Toast, Portal } from "@ant-design/react-native";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ID_CHECK, NICKNAME_CHECK, SIGN_UP } from "./apiUrls";
import qs from "qs";

export default function SignUp() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { loginId: "", password: "", email: "", nickname: "" },
    onSubmit: (value) => {
      const toastKey = Toast.loading("회원가입 중...");
      axios
        .post(
          SIGN_UP,
          qs.stringify({
            loginId: value.loginId,
            password: value.password,
            email: value.email,
            nickname: value.nickname,
          })
        )
        .then((response) => {
          Portal.remove(toastKey);
          Toast.success("회원가입에 성공했습니다.", 1);
        })
        .catch((error) => {
          Portal.remove(toastKey);
          Toast.fail("회원가입에 실패했습니다.", 1);
        });
    },
  });

  const handleIdCheckClicked = () => {
    const toastKey = Toast.loading("아이디 중복 체크 중...");
    axios
      .get<boolean>(ID_CHECK, {
        params: {
          loginId: values.loginId,
        },
      })
      .then(() => {
        Portal.remove(toastKey);
        Toast.success("아이디 중복 체크에 성공했습니다.", 1);
      })
      .catch(() => {
        Portal.remove(toastKey);
        Toast.fail("아이디 중복 체크에 실패했습니다.", 1);
      });
  };

  const handleNicknameCheckClicked = () => {
    const toastKey = Toast.loading("닉네임 중복 체크 중...");
    axios
      .get<boolean>(NICKNAME_CHECK, {
        params: {
          nickname: values.nickname,
        },
      })
      .then(() => {
        Portal.remove(toastKey);
        Toast.success("닉네임 중복 체크에 성공했습니다.", 1);
      })
      .catch(() => {
        Portal.remove(toastKey);
        Toast.fail("닉네임 중복 체크에 실패했습니다.", 1);
      });
  };

  return (
    <AppLayout>
      <ScrollView>
        <View style={SignUpStyles.container}>
          <TextareaItem
            onChangeText={handleChange("loginId")}
            value={values.loginId}
            placeholder="아이디"
          />
          <Button onPress={handleIdCheckClicked}>아이디 중복확인</Button>
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드"
          />
          <TextareaItem
            onChangeText={handleChange("email")}
            value={values.email}
            placeholder="이메일"
          />
          <Button>이메일 인증</Button>
          <TextareaItem
            onChangeText={handleChange("nickname")}
            value={values.nickname}
            placeholder="닉네임"
          />
          <Button onPress={handleNicknameCheckClicked}>닉네임 중복확인</Button>

          {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
          <Button onPress={handleSubmit as any}>완료</Button>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const SignUpStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
