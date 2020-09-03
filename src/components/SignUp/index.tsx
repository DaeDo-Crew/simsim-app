import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextareaItem, Button, Toast, Portal } from "@ant-design/react-native";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ID_CHECK, NICKNAME_CHECK } from "./apiUrls";

export default function SignUp() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { id: "", password: "", email: "", nickname: "" },
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const handleIdCheckClicked = () => {
    const toastKey = Toast.loading("아이디 중복 체크 중...");
    axios
      .get<boolean>(ID_CHECK, {
        params: {
          loginId: values.id,
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
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="아이디"
          />
          <Button onPress={handleIdCheckClicked}>아이디 중복확인</Button>
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드"
          />
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드 확인"
          />
          <TextareaItem
            onChangeText={handleChange("email")}
            value={values.email}
            placeholder="이메일"
          />
          <Button>이메일 인증</Button>
          <TextareaItem
            onChangeText={handleChange("email")}
            value={values.email}
            placeholder="이메일"
          />
          <Button>이메일 인증 확인</Button>
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
