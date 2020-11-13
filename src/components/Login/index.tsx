import * as React from "react";
import { useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { View, Text, StyleSheet } from "react-native";
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

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const { values, errors, handleSubmit, handleChange } = useFormik<
    LoginRequest
  >({
    initialValues: { id: "", password: "" },
    validationSchema: loginRequestSchema,
    onSubmit: async (value) => {
      setIsSubmitting(true);
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
          console.log(expoPushToken);
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
          console.log(error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  const handleSignupButtonClicked = () => {
    navigation.navigate("PrimarySignUp");
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
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="sshz@uos.ac.kr"
            textContentType="username"
            error={typeof errors.id !== "undefined"}
          />
        </View>
        <View style={AuthStyles.textInputContainer}>
          <TextInput
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="비밀번호를 입력해주세요"
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
          />
          <Button
            type="text"
            onPress={handleFindPasswordButtonClicked}
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
  },
});
