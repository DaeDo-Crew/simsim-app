import * as React from "react";
import { Text, TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";

export type ClubItem = {
  club_id: string;
  club_name: string;
};

export default function ClubListItem(props: ClubItem) {
  const { club_id, club_name } = props;
  const navigation = useNavigation();

  const handleClickClub = React.useCallback(() => {
    navigation.navigate("Club", { club_id: club_id, club_name: club_name });
  }, [club_id]);

  return (
    <TouchableWithoutFeedback onPress={handleClickClub}>
      <View style={ClubListItemStyles.container}>
        <Text style={ClubListItemStyles.clubItemText}>{club_name}</Text>
        <Entypo
          name="chevron-small-right"
          size={20}
          color={theme.colors.darkGrey}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const ClubListItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 32,
  },
  clubItemText: {
    fontSize: 16,
    width: 100,
  },
});
