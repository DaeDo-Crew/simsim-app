import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, View, Text, Alert } from "react-native";
import {
  TextareaItem,
  Button,
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

  const [nickNameVerified, setNickNameVerified] = React.useState<boolean>(
    false
  );
  const userSignUpPayload = useSelector(getUserSignUpPayload);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  const handleSignupButtonClicked = async () => {
    await axios
      .post(
        SIGN_UP,
        qs.stringify({
          loginId: userSignUpPayload.loginId,
          password: userSignUpPayload.password,
          email: userSignUpPayload.email,
          nickname: userSignUpPayload.nickname,
          code: userSignUpPayload.emailCode,
        })
      )
      .catch((error) => {
        if (error.response.data) {
          Alert.alert("다시 시도해주세요", error.response.data, [
            {
              text: "확인",
            },
          ]);
        } else {
          Alert.alert("다시 시도해주세요", "", [
            {
              text: "확인",
            },
          ]);
        }
      });
  };

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: { nickname: "" },
    validationSchema: nicknameCheckRequestSchema,
    onSubmit: async (value) => {
      await axios
        .post(
          NICKNAME_CHECK,
          qs.stringify({
            nickname: value.nickname,
          })
        )
        .then(() => {
          dispatch(setSignUpNickname(value.nickname));
          setNickNameVerified(true);
        })
        .catch((error) => {
          if (error.response.data) {
            Alert.alert("다시 시도해주세요", error.response.data, [
              {
                text: "확인",
              },
            ]);
          } else {
            Alert.alert("다시 시도해주세요", "", [
              {
                text: "확인",
              },
            ]);
          }
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
            {nickNameVerified ? (
              <>
                <View style={AuthStyles.mainButtonContainer}>
                  <Button
                    style={AuthStyles.button}
                    onPress={handleSignupButtonClicked}
                  >
                    <Text style={AuthStyles.mainButtonText}>회원가입 완료</Text>
                  </Button>
                </View>
              </>
            ) : (
              <>
                <View style={AuthStyles.mainButtonContainer}>
                  <Button
                    style={AuthStyles.button}
                    onPress={handleSubmit}
                    disabled={typeof errors.nickname !== "undefined"}
                  >
                    <Text style={AuthStyles.mainButtonText}>
                      닉네임 중복확인
                    </Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
