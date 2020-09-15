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
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ID_CHECK } from "./apiUrls";
import { AuthStyles } from "modules/auth/base";
import { setSignUpLoginId, setSignUpPassword } from "./redux/actions";
import { getUserSignUpPayload } from "./redux/selectors";
import { IdCheckRequest } from "./redux/types";
import { idCheckRequestSchema } from "./schemas";
import { useDispatch, useSelector } from "react-redux";
import { usePasswordConfirm } from "modules/auth/hooks";

export default function PrimarySignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userSignUpPayload = useSelector(getUserSignUpPayload);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입(1 of 3)",
    });
  });

  const handleNextButtonClicked = () => {
    navigation.navigate("SecondarySignUp");
  };

  const { values, errors, handleSubmit, handleChange } = useFormik<
    IdCheckRequest
  >({
    initialValues: { loginId: "", password: "" },
    validationSchema: idCheckRequestSchema,
    onSubmit: (value) => {
      if (!validatePasswordConfirm()) {
        Toast.fail("비밀번호와 비밀번호 확인이 일치하지 않습니다.", 1);
      } else {
        const toastKey = Toast.loading("아이디 중복 체크 중...");
        axios
          .get<boolean>(ID_CHECK, {
            params: {
              loginId: value.loginId,
            },
          })
          .then(() => {
            Portal.remove(toastKey);
            Toast.success("아이디 중복 체크에 성공했습니다.", 1);
            dispatch(setSignUpLoginId(value.loginId));
            dispatch(setSignUpPassword(value.password));
          })
          .catch(() => {
            Portal.remove(toastKey);
            Toast.fail("아이디 중복 체크에 실패했습니다.", 1);
          });
      }
    },
  });

  const {
    passwordConfirm,
    passwordConfirmError,
    validatePasswordConfirm,
    handlePasswordConfirmChange,
  } = usePasswordConfirm(values.password);

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("loginId")}
              value={values.loginId}
              placeholder="아이디"
              textContentType="username"
              error={typeof errors.loginId !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handleChange("password")}
              value={values.password}
              placeholder="비밀번호"
              textContentType="newPassword"
              secureTextEntry={true}
              error={typeof errors.password !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handlePasswordConfirmChange}
              value={passwordConfirm}
              placeholder="비밀번호 확인"
              textContentType="newPassword"
              secureTextEntry={true}
              error={passwordConfirmError !== ""}
            />
            <WhiteSpace size="xl" />
            {userSignUpPayload.loginId !== null &&
            userSignUpPayload.password !== null ? (
              <Button
                style={AuthStyles.button}
                onPress={handleNextButtonClicked}
              >
                <Text style={AuthStyles.mainButtonText}>다음</Text>
              </Button>
            ) : (
              <Button style={AuthStyles.button} onPress={handleSubmit}>
                <Text style={AuthStyles.mainButtonText}>아이디 중복확인</Text>
              </Button>
            )}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
