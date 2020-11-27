import * as React from "react";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "modules/AppLayout";
import { MeetUpItem } from "components/MeetUp/redux/types";

type MeetUpListAllNavigationalProps = {
  key: string;
  name: string;
  params: {
    meetUpList: MeetUpItem[];
  };
};

export default function MeetUpListAll({
  route,
}: {
  route: MeetUpListAllNavigationalProps;
}) {
  const navigation = useNavigation();

  React.useEffect(() => {
    console.log(route.params.meetUpList);
  });

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
      <ScrollView>
        <Text>123</Text>
      </ScrollView>
    </AppLayout>
  );
}
