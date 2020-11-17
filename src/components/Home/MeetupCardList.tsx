import * as React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import axios from "axios";
import { MeetUpItem } from "components/MeetUp/redux/types";
import { Text } from "react-native-paper";
import theme from "theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { setMeetUpList } from "components/MeetUp/redux/actions";
import { getMeetUpList } from "components/MeetUp/redux/selector";
import { MEEING_LIST_URL } from "./apiUrls";
import { Entypo } from "@expo/vector-icons";

const MeetupCardListHeader = () => {
  return (
    <View style={MeetUpCardStyles.cardListHeaderContainer}>
      <View>
        <Text style={MeetUpCardStyles.cardListHeaderTitle}>모집중인 모임</Text>
      </View>
      <View style={MeetUpCardStyles.cardListHeaderSubItemContainer}>
        <Text>전체보기</Text>
        <Entypo
          name="chevron-small-right"
          size={20}
          color={theme.colors.darkGrey}
        />
      </View>
    </View>
  );
};

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
  }, [token, setMeetUpList, dispatch]);

  return (
    <View style={MeetUpCardStyles.listContainer}>
      {meetUpList !== null && (
        <>
          <MeetupCardListHeader />
          <FlatList
            data={meetUpList}
            renderItem={MeetupCardItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
    marginVertical: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  itemInfoContainer: {
    marginTop: 16,
  },
  itemSubInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardListHeaderContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardListHeaderSubItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardListHeaderSubItemIcon: {
    color: theme.colors.black,
  },
  cardListHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardItemTitle: {
    fontSize: 16,
  },
  cardImage: {
    width: 200,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: theme.borderRadius,
  },
});
