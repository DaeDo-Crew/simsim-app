import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, View, Text } from "react-native";
import {
  TextareaItem,
  Button,
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
import { useFocusEffect } from "@react-navigation/native";

export default function PrimarySignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // TODO: 아래 삭제 하고 관련 에러메시지는 react-native-paper의 toast로 처리
  const [tempErrorMessage, setTempErrorMessage] = React.useState<string>();
  const [emailSent, setEmailSent] = React.useState<boolean>(false);
  const [
    secondarySignUpCompleted,
    setSecondarySignUpCompleted,
  ] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  useFocusEffect(
    React.useCallback(() => {
      setSecondarySignUpCompleted(false);
      setEmailSent(false);
    }, [])
  );

  const handleNextButtonClicked = () => {
    navigation.navigate("ThirdarySignUp");
    dispatch(setSignUpEmail(values.email));
  };

  const handleSendEmailCode = async () => {
    await axios
      .post(
        SEND_EMAIL_CODE,
        qs.stringify({
          email: values.email,
        })
      )
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        setTempErrorMessage(error.response.data);
      });
  };

  const { values, errors, handleSubmit, handleChange } = useFormik<
    EmailCheckRequest
  >({
    initialValues: { email: "", emailCheckCode: "" },
    validationSchema: emailCheckRequestSchema,
    onSubmit: async (value) => {
      await axios
        .post(
          EMAIL_CHECK,
          qs.stringify({
            insert_code: value.emailCheckCode,
            insert_email: value.email,
          })
        )
        .then(() => {
          setSecondarySignUpCompleted(true);
        })
        .catch((error) => {
          setTempErrorMessage(error.response.data);
        });
    },
  });

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <SignUpSteps currentStep={1} />
          <View style={AuthStyles.container}>
            {tempErrorMessage && (
              <Text style={AuthStyles.mainButtonText}>
                {`rnPaper로 변경하면 없앨거임: ${tempErrorMessage}`}
              </Text>
            )}
            <TextareaItem
              onChangeText={handleChange("email")}
              value={values.email}
              textContentType="emailAddress"
              placeholder="이메일"
              error={typeof errors.email !== "undefined"}
            />
            <WhiteSpace size="xl" />
            {(() => {
              if (!emailSent) {
                return (
                  <View style={AuthStyles.mainButtonContainer}>
                    <Button
                      style={AuthStyles.button}
                      onPress={handleSendEmailCode}
                      disabled={typeof errors.email !== "undefined"}
                    >
                      <Text style={AuthStyles.mainButtonText}>
                        이메일 인증메일 발송
                      </Text>
                    </Button>
                  </View>
                );
              } else {
                if (secondarySignUpCompleted) {
                  return (
                    <>
                      <TextareaItem
                        onChangeText={handleChange("emailCheckCode")}
                        value={values.emailCheckCode}
                        textContentType="oneTimeCode"
                        placeholder="이메일 인증코드"
                        error={typeof errors.emailCheckCode !== "undefined"}
                      />
                      <View style={AuthStyles.mainButtonContainer}>
                        <Button
                          style={AuthStyles.button}
                          onPress={handleNextButtonClicked}
                          disabled={
                            typeof errors.email !== "undefined" &&
                            typeof errors.emailCheckCode !== "undefined"
                          }
                        >
                          <Text style={AuthStyles.mainButtonText}>다음</Text>
                        </Button>
                      </View>
                    </>
                  );
                } else {
                  return (
                    <>
                      <TextareaItem
                        onChangeText={handleChange("emailCheckCode")}
                        value={values.emailCheckCode}
                        textContentType="oneTimeCode"
                        placeholder="이메일 인증코드"
                        error={typeof errors.emailCheckCode !== "undefined"}
                      />
                      <View style={AuthStyles.mainButtonContainer}>
                        <Button
                          style={AuthStyles.button}
                          onPress={handleSubmit}
                          disabled={
                            typeof errors.email !== "undefined" &&
                            typeof errors.emailCheckCode !== "undefined"
                          }
                        >
                          <Text style={AuthStyles.mainButtonText}>
                            이메일 중복확인
                          </Text>
                        </Button>
                      </View>
                    </>
                  );
                }
              }
            })()}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
