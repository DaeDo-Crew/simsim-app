import * as React from "react";
import { View, StyleSheet } from "react-native";
import theme from "theme";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

export default function CardListHeader({
  listTitle,
  isViewAll,
}: {
  listTitle: string;
  isViewAll: boolean;
}) {
  return (
    <View style={CardListHeaderStyles.container}>
      <View>
        <Text style={CardListHeaderStyles.headerTitle}>{listTitle}</Text>
      </View>
      {isViewAll && (
        <View style={CardListHeaderStyles.subItemContainer}>
          <Text>전체보기</Text>
          <Entypo
            name="chevron-small-right"
            size={20}
            color={theme.colors.darkGrey}
          />
        </View>
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
