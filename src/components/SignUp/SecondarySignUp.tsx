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
import { EMAIL_CHECK, SEND_EMAIL_CODE } from "./apiUrls";
import { AuthStyles } from "modules/auth/base";
import { setSignUpEmail } from "./redux/actions";
import { EmailCheckRequest } from "./redux/types";
import { emailCheckRequestSchema } from "./schemas";
import { useDispatch } from "react-redux";
import qs from "qs";
import SignUpSteps from "modules/auth/SignUpSteps";

export default function PrimarySignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [emailSent, setEmailSent] = React.useState(false);
  const [
    secondarySignUpCompleted,
    setSecondarySignUpCompleted,
  ] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  const handleNextButtonClicked = () => {
    navigation.navigate("ThirdarySignUp");
    dispatch(setSignUpEmail(values.email));
  };

  const handleSendEmailCode = () => {
    const toastKey = Toast.loading("인증 이메일 발송중...");
    axios
      .post(
        SEND_EMAIL_CODE,
        qs.stringify({
          email: values.email,
        })
      )
      .then(() => {
        Portal.remove(toastKey);
        setEmailSent(true);
        Toast.success("인증 이메일 발송에 성공했습니다.", 1);
      })
      .catch(() => {
        Portal.remove(toastKey);
        Toast.fail("인증 이메일 발송에 실패했습니다.", 1);
      });
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
          setSecondarySignUpCompleted(true);
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
          <SignUpSteps currentStep={1} />
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("email")}
              value={values.email}
              textContentType="emailAddress"
              placeholder="이메일"
              error={typeof errors.email !== "undefined"}
            />
            <WhiteSpace size="xl" />
            {!emailSent ? (
              <Button style={AuthStyles.button} onPress={handleSendEmailCode}>
                <Text style={AuthStyles.mainButtonText}>
                  이메일 인증메일 발송
                </Text>
              </Button>
            ) : (
              <>
                <TextareaItem
                  onChangeText={handleChange("emailCheckCode")}
                  value={values.emailCheckCode}
                  textContentType="oneTimeCode"
                  placeholder="이메일 인증코드"
                  error={typeof errors.emailCheckCode !== "undefined"}
                />
                <WhiteSpace size="xl" />
                {secondarySignUpCompleted ? (
                  <Button
                    style={AuthStyles.button}
                    onPress={handleNextButtonClicked}
                  >
                    <Text style={AuthStyles.mainButtonText}>다음</Text>
                  </Button>
                ) : (
                  <Button style={AuthStyles.button} onPress={handleSubmit}>
                    <Text style={AuthStyles.mainButtonText}>
                      이메일 중복확인
                    </Text>
                  </Button>
                )}
              </>
            )}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
