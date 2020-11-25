import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderRightButton from "./HeaderRightButton";

export default function MyPage() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "내 정보",
      headerRight: () => <HeaderRightButton />,
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <View style={MyPageStyles.container}>
          <View style={MyPageChangePassword.container}>
            <Text style={MyPageChangePassword.label}>비밀번호 변경</Text>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const MyPageChangePassword = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
});

const MyPageStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
