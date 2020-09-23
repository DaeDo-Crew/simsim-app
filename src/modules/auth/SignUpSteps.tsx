import * as React from "react";
import { View, Text } from "react-native";
import { Steps } from "@ant-design/react-native";

const Step = Steps.Step;

const SIGN_UP_STEPS = [
  { title: "아이디 입력" },
  { title: "이메일 입력" },
  { title: "닉네임 입력" },
];

export default function SignUpSteps({ currentStep }: { currentStep: number }) {
  return (
    <Steps size="small" current={currentStep} direction="horizontal">
      {SIGN_UP_STEPS.map((item, index) => (
        <Step
          key={index}
          title={
            <View>
              <Text>{item.title}</Text>
            </View>
          }
        />
      ))}
    </Steps>
  );
}
