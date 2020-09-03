import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, Button, StyleSheet, View } from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "회원가입",
    });
  });

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { id: "", password: "", email: "", nickname: "" },
    onSubmit: (value) => {
      console.log(value);
    },
  });
  return (
    <AppLayout>
      <ScrollView>
        <View style={SignUpStyles.container}>
          <TextareaItem
            onChangeText={handleChange("id")}
            value={values.id}
            placeholder="아이디"
          />
          <TextareaItem
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="패스워드"
          />
          <TextareaItem
            onChangeText={handleChange("email")}
            value={values.email}
            placeholder="이메일"
          />
          <TextareaItem
            onChangeText={handleChange("nickname")}
            value={values.nickname}
            placeholder="닉네임"
          />
          {/* https://github.com/formium/formik/issues/376/#issuecomment-466964585 */}
          <Button onPress={handleSubmit as any} title="완료" />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const SignUpStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
