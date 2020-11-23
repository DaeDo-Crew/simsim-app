import * as React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import ClubCard from "./ClubCard";
import ClubNotice from "./ClubNotice";

type ClubProps = {
  key: string;
  name: string;
  params: {
    club_id: number;
    club_name?: string;
  };
};

export default function Club({ route }: { route: ClubProps }) {
  const { club_id, club_name } = route.params;
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${club_name}의 소개`,
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <View style={ClubStyles.container}>
          <ClubCard clubId={club_id} />
        </View>
        <ClubNotice club_id={club_id} />
      </ScrollView>
    </AppLayout>
  );
}

const ClubStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
