import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthStyles } from "modules/auth/base";
import TextInput from "modules/TextInput";
import { SignUpRequest } from "./redux/types";
import { useFormik } from "formik";
import { signUpRequestSchema } from "./schemas";
import Button from "modules/Button";
import { Button as RnpButton, Checkbox } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { useDispatch } from "react-redux";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { axiosInstance } from "utils/axiosInstance";

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [agreed, setAgreed] = React.useState(false);

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting,
    isValid,
  } = useFormik<SignUpRequest>({
    initialValues: {
      password: "",
      email: "",
      nickname: "",
      code: "",
    },
    validationSchema: signUpRequestSchema,
    onSubmit: async (value: SignUpRequest) => {
      if (isValid) {
        axiosInstance({
          method: "POST",
          url: "/member/signup",
          params: {
            password: value.password,
            email: value.email,
            nickname: value.nickname,
            code: value.code,
          },
        })
          .then(() => {
            dispatch(
              showSnackbar({
                visible: true,
                message: "회원가입에 성공했습니다.",
              })
            );
            navigation.navigate("Login");
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

  const handleSendEmailCode = React.useCallback(async () => {
    await axiosInstance({
      method: "POST",
      url: "/member/signup/sendEmail",
      params: {
        email: values.email,
      },
    })
      .then(() => {
        Alert.alert("인증코드를 발송했습니다.", `${values.email}`, [
          {
            text: "학교 이메일로 이동",
            onPress: openUOSWebmail,
          },
          {
            text: "취소",
          },
        ]);
      })
      .catch((error) => {
        Alert.alert("다시 시도해주세요.", `${error.response.data}`, [
          {
            text: "확인",
          },
        ]);
      });
  }, [values.email]);

  const openUOSWebmail = React.useCallback(() => {
    WebBrowser.openBrowserAsync("http://webmail.uos.ac.kr/").catch(() => {
      dispatch(
        showSnackbar({
          visible: true,
          message: "학교 이메일로 이동할 수 없습니다.",
        })
      );
    });
  }, []);

  const handleAgreeClick = React.useCallback(() => {
    setAgreed(!agreed);
  }, [agreed]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  const handleAgreementDetailClick = React.useCallback(() => {
    navigation.navigate("Privacy");
  }, []);

  return (
    <AppLayout>
      <ScrollView>
        <KeyboardAvoidingView style={SignUpStyles.container} behavior="height">
          <View style={SignUpStyles.introContainer}>
            <Text style={AuthStyles.introText}>반갑습니다!</Text>
          </View>
          <View style={SignUpStyles.subIntroContainer}>
            <Text style={SignUpStyles.subIntroText}>
              간단한 학교이메일 인증 후 {"\n"} 심심했지의 모든 서비스를 이용할
              수 있어요😁
            </Text>
          </View>
          <View style={SignUpStyles.formContainer}>
            <View style={SignUpStyles.emailFormContainer}>
              <View style={SignUpStyles.emailFormTextInput}>
                <TextInput
                  label="서울시립대학교 포털이메일"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholder="sshz@uos.ac.kr"
                  textContentType="emailAddress"
                  errorMessage={errors.email}
                />
              </View>
              <View style={SignUpStyles.emailFormButton}>
                <RnpButton
                  mode="contained"
                  onPress={handleSendEmailCode}
                  contentStyle={{
                    height: 56,
                  }}
                  labelStyle={SignUpStyles.emailFormButtonText}
                >
                  인증요청
                </RnpButton>
              </View>
            </View>
            <View style={SignUpStyles.formItem}>
              <TextInput
                label="인증코드"
                onChangeText={handleChange("code")}
                value={values.code}
                placeholder="FWSZ"
                textContentType="none"
                errorMessage={errors.code}
              />
            </View>
            <View style={SignUpStyles.formItem}>
              <TextInput
                label="비밀번호"
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="9자리 이상 영문 + 숫자"
                textContentType="newPassword"
                secureTextEntry={true}
                errorMessage={errors.password}
              />
            </View>
            <View style={SignUpStyles.formItem}>
              <TextInput
                label="닉네임"
                onChangeText={handleChange("nickname")}
                value={values.nickname}
                placeholder="전농동 불주먹"
                textContentType="nickname"
                errorMessage={errors.nickname}
              />
            </View>
            <View style={SignUpStyles.agreementContainer}>
              <Checkbox.Android
                status={agreed ? "checked" : "unchecked"}
                onPress={handleAgreeClick}
              />
              <TouchableWithoutFeedback onPress={handleAgreementDetailClick}>
                <Text style={SignUpStyles.agreementText}>
                  심심했지의 이용약관에 동의합니다.
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={SignUpStyles.submitContainer}>
              {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
              <Button
                type="contained"
                label="회원가입"
                isSubmitting={isSubmitting}
                onPress={handleSubmit as any}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </AppLayout>
  );
}

const SignUpStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 32,
  },
  formContainer: {
    marginTop: 32,
    marginHorizontal: 32,
  },
  formItem: {
    marginTop: 16,
  },
  emailFormContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  emailFormTextInput: {
    flexGrow: 1,
    flexShrink: 0,
  },
  emailFormButton: {
    marginTop: 6,
    marginLeft: 8,
  },
  emailFormButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  submitContainer: {
    marginTop: 32,
  },
  introContainer: {
    marginTop: 32,
  },
  subIntroContainer: {
    marginTop: 16,
  },
  subIntroText: {
    textAlign: "center",
    fontSize: 16,
  },
  agreementContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  agreementText: {
    textDecorationLine: "underline",
  },
});
