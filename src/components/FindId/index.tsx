import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, View, Text } from "react-native";
import {
  TextareaItem,
  Button,
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

  // TODO: 아래 삭제 하고 관련 에러메시지는 react-native-paper의 toast로 처리
  const [tempErrorMessage, setTempErrorMessage] = React.useState<string>();
  const [emailCheckCompleted, setEmailCheckCompleted] = React.useState<boolean>(
    false
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "아이디 찾기",
    });
  });

  const handleEmailCheckButtonClicked = async () => {
    await axios
      .post<boolean>(
        EMAIL_CHECK_FIND_ID,
        qs.stringify({
          email: values.insert_email,
        })
      )
      .then(() => {
        setEmailCheckCompleted(true);
      })
      .catch((error) => {
        setTempErrorMessage(error.response.data);
      });
  };

  const { values, errors, handleSubmit, handleChange } = useFormik<
    FindIdRequest
  >({
    initialValues: { insert_code: "", insert_email: "" },
    validationSchema: findIdRequestSchema,
    onSubmit: async (value) => {
      await axios
        .post<boolean>(
          FIND_ID,
          qs.stringify({
            insert_code: value.insert_code,
            insert_email: value.insert_email,
          })
        )
        .then(() => {
          navigation.navigate("FoundId");
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
          <View style={AuthStyles.container}>
            {tempErrorMessage && (
              <Text style={AuthStyles.mainButtonText}>
                {`rnPaper로 변경하면 없앨거임: ${tempErrorMessage}`}
              </Text>
            )}
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
                <View style={AuthStyles.mainButtonContainer}>
                  <Button style={AuthStyles.button} onPress={handleSubmit}>
                    <Text style={AuthStyles.mainButtonText}>아이디 찾기</Text>
                  </Button>
                </View>
              </>
            ) : (
              <>
                <View style={AuthStyles.mainButtonContainer}>
                  <Button
                    style={AuthStyles.button}
                    onPress={handleEmailCheckButtonClicked}
                  >
                    <Text style={AuthStyles.mainButtonText}>
                      인증 이메일 발송
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
