import * as React from "react";
import { View, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator";

const LABELS = ["아이디 확인", "이메일 인증", "닉네임 입력"];

export default function SignUpSteps({ currentStep }: { currentStep: number }) {
  return (
    <View style={StepStyles.container}>
      <StepIndicator
        currentPosition={currentStep}
        labels={LABELS}
        stepCount={LABELS.length}
      />
    </View>
  );
}

const StepStyles = StyleSheet.create({
  container: {
    margin: 32,
    width: "100%",
    alignSelf: "center",
  },
});
