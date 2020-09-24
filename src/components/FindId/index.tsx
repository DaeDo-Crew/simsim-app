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
import { useNavigation } from "@react-navigation/native";
import qs from "qs";
import axios from "axios";
import { AuthStyles } from "modules/auth/base";
import { useFormik } from "formik";
import { findIdRequestSchema } from "./schemas";
import { FindIdRequest } from "./redux/types";
import { FIND_ID, EMAIL_CHECK_FIND_ID } from "./apiUrls";

export default function FindId() {
  const navigation = useNavigation();
  const [emailCheckCompleted, setEmailCheckCompleted] = React.useState<boolean>(
    false
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "아이디 찾기",
    });
  });

  const handleEmailCheckButtonClicked = () => {
    const toastKey = Toast.loading("이메일 전송 중...");
    axios
      .post<boolean>(
        EMAIL_CHECK_FIND_ID,
        qs.stringify({
          email: values.insert_email,
        })
      )
      .then(() => {
        Portal.remove(toastKey);
        Toast.success("이메일이 전송되었습니다.", 1);
        setEmailCheckCompleted(true);
      })
      .catch((error) => {
        Portal.remove(toastKey);
        Toast.fail(error.response.data, 1);
      });
  };

  const { values, errors, handleSubmit, handleChange } = useFormik<
    FindIdRequest
  >({
    initialValues: { insert_code: "", insert_email: "" },
    validationSchema: findIdRequestSchema,
    onSubmit: (value) => {
      const toastKey = Toast.loading("아이디 찾는 중...");
      axios
        .post<boolean>(
          FIND_ID,
          qs.stringify({
            insert_code: value.insert_code,
            insert_email: value.insert_email,
          })
        )
        .then(() => {
          Portal.remove(toastKey);
          navigation.navigate("FoundId");
        })
        .catch((error) => {
          Portal.remove(toastKey);
          Toast.fail(error.response.data, 1);
        });
    },
  });

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <View style={AuthStyles.container}>
            <TextareaItem
              onChangeText={handleChange("insert_email")}
              value={values.insert_email}
              placeholder="이메일"
              textContentType="emailAddress"
              error={typeof errors.insert_email !== "undefined"}
            />
            <WhiteSpace size="xl" />
            {emailCheckCompleted ? (
              <>
                <TextareaItem
                  onChangeText={handleChange("insert_code")}
                  value={values.insert_code}
                  placeholder="인증코드"
                  textContentType="oneTimeCode"
                  error={typeof errors.insert_code !== "undefined"}
                />
                <WhiteSpace size="xl" />
                <Button style={AuthStyles.button} onPress={handleSubmit}>
                  <Text style={AuthStyles.mainButtonText}>아이디 찾기</Text>
                </Button>
              </>
            ) : (
              <Button
                style={AuthStyles.button}
                onPress={handleEmailCheckButtonClicked}
              >
                <Text style={AuthStyles.mainButtonText}>인증 이메일 발송</Text>
              </Button>
            )}
          </View>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
