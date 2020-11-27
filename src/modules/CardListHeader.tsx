import * as React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import theme from "theme";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MeetUpItem } from "components/MeetUp/redux/types";
import { useNavigation } from "@react-navigation/native";

type HeaderType = "MEETUP" | "CLUB";

export default function CardListHeader({
  type,
  listTitle,
  isViewAll,
  meetupList,
}: {
  type: HeaderType;
  listTitle: string;
  isViewAll: boolean;
  meetupList?: MeetUpItem[];
}) {
  const navigation = useNavigation();

  const handleClickMoreButton = React.useCallback(() => {
    if (type == "MEETUP") {
      navigation.navigate("MeetUpListAll", {
        listTitle: listTitle,
        meetUpList: meetupList,
      });
    }
  }, [meetupList, type]);

  return (
    <View style={CardListHeaderStyles.container}>
      <View>
        <Text style={CardListHeaderStyles.headerTitle}>{listTitle}</Text>
      </View>
      {isViewAll && (
        <TouchableWithoutFeedback onPress={handleClickMoreButton}>
          <View style={CardListHeaderStyles.subItemContainer}>
            <Text>전체보기</Text>
            <Entypo
              name="chevron-small-right"
              size={20}
              color={theme.colors.darkGrey}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const CardListHeaderStyles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
