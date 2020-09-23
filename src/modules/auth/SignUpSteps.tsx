import * as React from "react";
import { View, Text } from "react-native";
import { Steps } from "@ant-design/react-native";

const Step = Steps.Step;

const SIGN_UP_STEPS = [
  { title: "1 of 3", description: "첫번째" },
  { title: "2 of 3", description: "두번째" },
  { title: "3 of 3", description: "세번째" },
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
          status={item.description}
        />
      ))}
    </Steps>
  );
}
