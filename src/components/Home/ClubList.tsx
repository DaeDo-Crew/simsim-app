import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import CardListHeader from "modules/CardListHeader";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import theme from "theme";
import { SHOW_CLUB_LIST } from "./apiUrls";
import axios from "axios";
import { FlatGrid } from "react-native-super-grid";
import ClubListItem, { ClubItem } from "./ClubListItem";

export default function ClubList() {
  const token = useSelector(getUserToken);

  const [clubListItemData, setClubListItemData] = React.useState<ClubItem[]>();

  React.useEffect(() => {
    axios({
      method: "GET",
      url: SHOW_CLUB_LIST,
      headers: {
        Authorization: token.accessToken,
      },
    })
      .then((response) => {
        setClubListItemData(response.data);
      })
      .catch(() => {
        Alert.alert("동아리 목록을 불러올 수 없습니다.", "", [
          {
            text: "확인",
          },
        ]);
      });
  }, []);
  return (
    <>
      {typeof clubListItemData !== "undefined" && (
        <View style={ClubListStyles.container}>
          <CardListHeader listTitle="동아리 알아보기" isViewAll={false} />
          <View style={ClubListStyles.clubListContainer}>
            <FlatGrid
              itemDimension={60}
              spacing={0}
              fixed={true}
              staticDimension={180}
              data={clubListItemData}
              renderItem={({ item }) => (
                <ClubListItem
                  club_id={item.club_id}
                  club_name={item.club_name}
                />
              )}
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
});
