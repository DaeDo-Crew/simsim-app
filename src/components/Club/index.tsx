import * as React from "react";
import { View, Text } from "react-native";

type ClubProps = {
  key: string;
  name: string;
  params: {
    club_id: number;
  };
};

export default function Club({ route }: { route: ClubProps }) {
  return (
    <View>
      <Text>{route.params.club_id}</Text>
    </View>
  );
}
