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
import { EMAIL_CHECK } from "./apiUrls";
import { AuthStyles } from "modules/auth/base";
import { setSignUpEmail } from "./redux/actions";
import { getUserSignUpPayload } from "./redux/selectors";
import { EmailCheckRequest } from "./redux/types";
import { emailCheckRequestSchema } from "./schemas";
import { useDispatch, useSelector } from "react-redux";

export default function PrimarySignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userSignUpPayload = useSelector(getUserSignUpPayload);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입(2 of 3)",
    });
  });

  const handleNextButtonClicked = () => {
    navigation.navigate("ThirdarySignUp");
  };

  const { values, errors, handleSubmit, handleChange } = useFormik<
    EmailCheckRequest
  >({
    initialValues: { email: "", emailCheckCode: "" },
    validationSchema: emailCheckRequestSchema,
    onSubmit: (value) => {
      const toastKey = Toast.loading("이메일 중복 체크 중...");
      axios
        .get(EMAIL_CHECK, {
          params: {
            insert_email: value.email,
            insert_code: value.emailCheckCode,
          },
        })
        .then(() => {
          Portal.remove(toastKey);
          Toast.success("이메일 중복 체크에 성공했습니다.", 1);
          dispatch(setSignUpEmail(value.email));
        })
        .catch(() => {
          Portal.remove(toastKey);
          Toast.fail("이메일 중복 체크에 실패했습니다.", 1);
        });
    },
  });

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("email")}
              value={values.email}
              textContentType="emailAddress"
              placeholder="이메일"
              error={typeof errors.email !== "undefined"}
            />
            <WhiteSpace size="xl" />
            <TextareaItem
              onChangeText={handleChange("emailCheckCode")}
              value={values.emailCheckCode}
              textContentType="oneTimeCode"
              placeholder="이메일 인증코드"
              error={typeof errors.emailCheckCode !== "undefined"}
            />
            <WhiteSpace size="xl" />
            {userSignUpPayload.email !== null ? (
              <Button
                style={AuthStyles.button}
                onPress={handleNextButtonClicked}
              >
                <Text style={AuthStyles.mainButtonText}>다음</Text>
              </Button>
            ) : (
              <Button style={AuthStyles.button} onPress={handleSubmit}>
                <Text style={AuthStyles.mainButtonText}>이메일 중복확인</Text>
              </Button>
            )}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
