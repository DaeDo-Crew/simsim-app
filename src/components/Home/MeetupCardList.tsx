import * as React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import axios from "axios";
import { MeetUpItem } from "components/MeetUp/redux/types";
import theme from "theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { setMeetUpList } from "components/MeetUp/redux/actions";
import { getMeetUpList } from "components/MeetUp/redux/selector";
import { MEEING_LIST_URL } from "./apiUrls";

function MeetupCardListHeader() {
  return <Text style={MeetUpCardStyles.cardListheader}>모집중인 모임</Text>;
}

export default function MeetupCardList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const meetUpList = useSelector(getMeetUpList);

  const MeetupCardItem = ({ item }: { item: MeetUpItem }) => {
    const handleClickMeetUpCardItem = () => {
      navigation.navigate("MeetUp", { meetingId: item.meetingId });
    };
    return (
      <TouchableWithoutFeedback onPress={handleClickMeetUpCardItem}>
        <View style={MeetUpCardStyles.itemContainer}>
          <Image
            source={{ uri: item.imgUrlList[0] }}
            style={MeetUpCardStyles.cardImage}
          />
          <View style={MeetUpCardStyles.itemInfoContainer}>
            <Text style={MeetUpCardStyles.cardItemTitle}>
              {item.meetingName}
            </Text>
            <View style={MeetUpCardStyles.itemSubInfoContainer}>
              <Text>{item.clubName}</Text>
              <Text>{item.deadline}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  React.useEffect(() => {
    if (token !== null) {
      axios
        .get(MEEING_LIST_URL, {
          headers: {
            Authorization: token.accessToken,
          },
        })
        .then((response) => {
          dispatch(setMeetUpList(response.data));
        })
        .catch(() => {
          Alert.alert("데이터를 불러올 수 없습니다.", "", [
            {
              text: "확인",
            },
          ]);
        });
    }
  }, [token]);

  return (
    <View style={MeetUpCardStyles.listContainer}>
      {meetUpList !== null && (
        <>
          <MeetupCardListHeader />
          <FlatList
            data={meetUpList}
            renderItem={MeetupCardItem}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item) => String(item.meetingId)}
          />
        </>
      )}
    </View>
  );
}

const MeetUpCardStyles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: theme.colors.ligthGrey,
    height: 200,
    width: 200,
    overflow: "hidden",
  },
  itemInfoContainer: {
    padding: 8,
  },
  itemSubInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardListheader: {
    marginTop: 16,
    marginStart: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardItemTitle: {
    fontSize: 16,
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
});
