import * as React from "react";
import { View, Text } from "react-native";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";

type ClubProps = {
  key: string;
  name: string;
  params: {
    club_id: number;
  };
};

export default function Club({ route }: { route: ClubProps }) {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
    });
  });

  return (
    <AppLayout>
      <Text>{route.params.club_id}</Text>
    </AppLayout>
  );
}
