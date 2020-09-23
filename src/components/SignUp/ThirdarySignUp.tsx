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
import { NICKNAME_CHECK, SIGN_UP } from "./apiUrls";
import { AuthStyles } from "modules/auth/base";
import { setSignUpNickname } from "./redux/actions";
import { getUserSignUpPayload } from "./redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { nicknameCheckRequestSchema } from "./schemas";
import qs from "qs";
import _ from "underscore";
import SignUpSteps from "modules/auth/SignUpSteps";

export default function PrimarySignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userSignUpPayload = useSelector(getUserSignUpPayload);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
    });
  });

  const handleSignupButtonClicked = () => {
    const toastKey = Toast.loading("회원가입 중...");
    axios
      .post(
        SIGN_UP,
        qs.stringify({
          loginId: userSignUpPayload.loginId,
          password: userSignUpPayload.password,
          email: userSignUpPayload.email,
          nickname: userSignUpPayload.nickname,
        })
      )
      .then(() => {
        Portal.remove(toastKey);
        Toast.success("회원가입에 성공했습니다.", 1);
      })
      .catch(() => {
        Portal.remove(toastKey);
        Toast.fail("회원가입에 실패했습니다.", 1);
      });
  };

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: { nickname: "" },
    validationSchema: nicknameCheckRequestSchema,
    onSubmit: (value) => {
      const toastKey = Toast.loading("닉네임 중복 체크 중...");
      axios
        .get(NICKNAME_CHECK, {
          params: {
            nickname: value.nickname,
          },
        })
        .then(() => {
          Portal.remove(toastKey);
          Toast.success("닉네임 중복 체크에 성공했습니다.", 1);
          dispatch(setSignUpNickname(value.nickname));
        })
        .catch(() => {
          Portal.remove(toastKey);
          Toast.fail("닉네임 중복 체크에 실패했습니다.", 1);
        });
    },
  });

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <SignUpSteps currentStep={2} />
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("nickname")}
              value={values.nickname}
              textContentType="nickname"
              placeholder="닉네임"
              error={typeof errors.nickname !== "undefined"}
            />
            <WhiteSpace size="xl" />
            {_.isNull(userSignUpPayload) !== null ? (
              <Button
                style={AuthStyles.button}
                onPress={handleSignupButtonClicked}
              >
                <Text style={AuthStyles.mainButtonText}>완료</Text>
              </Button>
            ) : (
              <Button style={AuthStyles.button} onPress={handleSubmit}>
                <Text style={AuthStyles.mainButtonText}>닉네임 중복확인</Text>
              </Button>
            )}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
