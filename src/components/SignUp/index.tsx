import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, Text, Button, StyleSheet, View } from "react-native";
import { TextareaItem } from "@ant-design/react-native";
import { Formik } from "formik";

export default function SignUp() {
  return (
    <AppLayout>
      <Formik
        initialValues={{ id: "", password: "", email: "", nickName: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScrollView>
            <View style={LoginStyles.container}>
              <TextareaItem
                onChangeText={handleChange("id")}
                onBlur={handleBlur("id")}
                value={values.id}
                placeholder="아이디"
              />
              <TextareaItem
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="패스워드"
              />
              <TextareaItem
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="이메일"
              />
              <TextareaItem
                onChangeText={handleChange("nickName")}
                onBlur={handleBlur("nickName")}
                value={values.nickName}
                placeholder="닉네임"
              />
              <Button onPress={handleSubmit} title="회원가입" />
            </View>
          </ScrollView>
        )}
      </Formik>
    </AppLayout>
  );
}

const SignUpStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
