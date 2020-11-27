import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import { MeetUpItem } from "components/MeetUp/redux/types";
import { FlatGrid } from "react-native-super-grid";
import MeetupCardItem from "components/Home/MeetupCardItem";
import theme from "theme";

type MeetUpListAllNavigationalProps = {
  key: string;
  name: string;
  params: {
    meetUpList: MeetUpItem[];
    listTitle: string;
  };
};

export default function MeetUpListAll({
  route,
}: {
  route: MeetUpListAllNavigationalProps;
}) {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });
  });

  return (
    <AppLayout>
      <Text style={MeetUpListAllStyles.listTitleText}>
        {route.params.listTitle}
      </Text>
      <View style={MeetUpListAllStyles.container}>
        <FlatGrid
          data={route.params.meetUpList}
          renderItem={({ item }) => <MeetupCardItem item={item} />}
        />
      </View>
    </AppLayout>
  );
}

const MeetUpListAllStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  listTitleText: {
    marginTop: 32,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.black,
  },
});