import * as React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import { Button } from "@ant-design/react-native";
import theme from "theme";

const style = StyleSheet.create({
  HomeContainer: {
    margin: 8,
  },
});

export default function Home() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "홈",
    });
  });

  return (
    <AppLayout>
      <ScrollView style={style.HomeContainer}>
        <Text>hello</Text>
        <Button
          style={{
            borderWidth: 0,
            alignSelf: "flex-start",
            backgroundColor: `${theme.colors.secondary}`,
          }}
        >
          동아리 유형
        </Button>
      </ScrollView>
    </AppLayout>
  );
}
