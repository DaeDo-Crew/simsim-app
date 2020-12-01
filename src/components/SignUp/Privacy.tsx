import * as React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AppLayout from "modules/AppLayout";
import { PRIVACY_TEXT } from "./terms";
import { useNavigation } from "@react-navigation/native";

export default function Privacy() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "개인정보 처리방침",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <View style={PrivacyStyles.container}>
          <Text>{PRIVACY_TEXT}</Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
}
const PrivacyStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 32,
  },
});
