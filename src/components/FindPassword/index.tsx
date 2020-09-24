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

export default function FindPassword() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "비밀번호 찾기",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <WingBlank>
          <Text>123</Text>
        </WingBlank>
      </ScrollView>
    </AppLayout>
  );
}
