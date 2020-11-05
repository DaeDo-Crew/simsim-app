import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";

export default function Club() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "동아리 상세페이지",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <View>
          <Text>123</Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
}
