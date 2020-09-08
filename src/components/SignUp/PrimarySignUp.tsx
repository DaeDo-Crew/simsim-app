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
    initialValues: { loginId: "", password: "", passwordConfirm: "" },
    validationSchema: idCheckRequestSchema,
    onSubmit: (value) => {
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
    },
  });

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("loginId")}
              value={values.loginId}
              placeholder="아이디"
              error={typeof errors.loginId !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handleChange("password")}
              value={values.password}
              placeholder="비밀번호"
              error={typeof errors.password !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handleChange("passwordConfirm")}
              value={values.passwordConfirm}
              placeholder="비밀번호 확인"
              error={typeof errors.passwordConfirm !== "undefined"}
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
