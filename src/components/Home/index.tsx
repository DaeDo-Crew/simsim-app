import * as React from "react";
import { Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";

export default function Home() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "홈",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <Text>hello</Text>
      </ScrollView>
    </AppLayout>
  );
}
