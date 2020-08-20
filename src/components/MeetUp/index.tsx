import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export default function MeetUp() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "모임 상세보기",
    });
  });
  return <Text>Hello</Text>;
}
