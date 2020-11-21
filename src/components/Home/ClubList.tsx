import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CardListHeader from "./CardListHeader";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import theme from "theme";
import { SHOW_CLUB_LIST } from "./apiUrls";
import axios from "axios";
import { FlatGrid } from "react-native-super-grid";
import { Entypo } from "@expo/vector-icons";

type ClubListItem = {
  club_id: string;
  club_name: string;
};

const ClubListItem = ({ item }: { item: ClubListItem }) => {
  return (
    <View style={ClubListStyles.clubItemContainer}>
      <Text style={ClubListStyles.clubItemText}>{item.club_name}</Text>
      <Entypo
        name="chevron-small-right"
        size={20}
        color={theme.colors.darkGrey}
      />
    </View>
  );
};

export default function ClubList() {
  const token = useSelector(getUserToken);

  const [clubListItem, setClubListItem] = React.useState<ClubListItem[]>();

  React.useEffect(() => {
    axios({
      method: "GET",
      url: SHOW_CLUB_LIST,
      headers: {
        Authorization: token.accessToken,
      },
    }).then((response) => {
      setClubListItem(response.data);
    });
  }, []);
  return (
    <>
      {typeof clubListItem !== "undefined" && (
        <View style={ClubListStyles.container}>
          <CardListHeader listTitle="동아리 알아보기" isViewAll={false} />
          <View style={ClubListStyles.clubListContainer}>
            <FlatGrid
              itemDimension={60}
              spacing={0}
              fixed={true}
              staticDimension={180}
              data={clubListItem}
              renderItem={ClubListItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </>
  );
}

const ClubListStyles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    backgroundColor: theme.colors.ligthGrey,
  },
  clubListContainer: {
    marginTop: 32,
    marginLeft: 16,
  },
  clubItemContainer: {
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
