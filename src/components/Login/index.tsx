import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import TextInput from "modules/TextInput";
import Button from "modules/Button";
import { useFormik } from "formik";
import axios from "axios";
import { setUserToken } from "./redux/actions";
import { LoginResponse, LoginRequest } from "./redux/types";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_URL, UPLOAD_EXPO_PUSH_TOKEN_URL } from "./apiUrls";
import { AuthStyles } from "modules/auth/base";
import { loginRequestSchema } from "./schemas";
import qs from "qs";
import { registerForPushNotificationsAsync } from "utils/pushNotifications";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = useFormik<LoginRequest>({
    initialValues: { id: "", password: "" },
    validationSchema: loginRequestSchema,
    onSubmit: async (value) => {
      axios
        .post<LoginResponse>(
          LOGIN_URL,
          qs.stringify({
            loginId: value.id,
            password: value.password,
          })
        )
        .then(async (response) => {
          dispatch(
            setUserToken({
              accessToken: response.data.accessToken,
              // refreshToken: response.data.refreshToken,
            })
          );
          const expoPushToken = await registerForPushNotificationsAsync();
          await axios.post(
            UPLOAD_EXPO_PUSH_TOKEN_URL,
            qs.stringify({ expoPushToken: expoPushToken }),
            {
              headers: {
                Authorization: response.data.accessToken,
              },
            }
          );
        })
        .catch((error) => {
          Alert.alert("다시 시도해주세요.", `${error.response.data}`, [
            {
              text: "확인",
            },
          ]);
        });
    },
  });

  const handleSignupButtonClicked = () => {
    navigation.navigate("SignUp");
  };

  const handleFindPasswordButtonClicked = () => {
    navigation.navigate("FindPassword");
  };

  return (
    <AppLayout>
      <View style={AuthStyles.container}>
        <View style={AuthStyles.introContainer}>
          <Text style={AuthStyles.introText}>환영합니다!</Text>
        </View>
        <View style={AuthStyles.textInputContainer}>
          <TextInput
            label="학교 이메일"
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="sshz@uos.ac.kr"
            textContentType="username"
            error={typeof errors.id !== "undefined"}
          />
        </View>
        <View style={AuthStyles.textInputContainer}>
          <TextInput
            label="비밀번호"
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="9자리 이상 영문 + 숫자"
            textContentType="password"
            secureTextEntry={true}
            error={typeof errors.password !== "undefined"}
          />
        </View>
        <View style={LoginStyles.saveIdContainer}>
          <Checkbox.Android status="checked" />
          <Text>학교 이메일 저장하기</Text>
        </View>
        <View style={AuthStyles.mainButtonContainer}>
          {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
          <Button
            type="contained"
            onPress={handleSubmit as any}
            isSubmitting={isSubmitting}
            label="접속하기"
          />
        </View>
        <View style={LoginStyles.subButtonContainer}>
          <Button
            type="text"
            onPress={handleSignupButtonClicked}
            label="회원가입"
            compact={true}
          />
          <Button
            type="text"
            onPress={handleFindPasswordButtonClicked}
            compact={true}
            label="비밀번호 변경"
          />
        </View>
      </View>
    </AppLayout>
  );
}

const LoginStyles = StyleSheet.create({
  saveIdContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  subButtonContainer: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
