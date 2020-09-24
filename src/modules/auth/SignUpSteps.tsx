import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Steps } from "@ant-design/react-native";

const SIGN_UP_STEPS = [
  { title: "아이디 확인" },
  { title: "이메일 인증" },
  { title: "닉네임 입력" },
];

export default function SignUpSteps({ currentStep }: { currentStep: number }) {
  return (
    <View style={StepStyles.container}>
      <Steps size="small" current={currentStep} direction="horizontal">
        {SIGN_UP_STEPS.map((item, index) => (
          <Steps.Step
            key={index}
            title={
              <View>
                <Text style={StepStyles.title}>{item.title}</Text>
              </View>
            }
          />
        ))}
      </Steps>
    </View>
  );
}

const StepStyles = StyleSheet.create({
  container: {
    margin: 32,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
  },
});
