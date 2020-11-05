import * as React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import Divider from "modules/Divider";
import Avatar from "modules/Avatar";
import axios from "axios";
import {
  CLUB_DETAIL_URL,
  CLUB_SUBSCRIBE_URL,
  CLUB_UNSUBSCRIBE_URL,
} from "./apiUrls";
import { getUserToken } from "components/Login/redux/selectors";
import { Button } from "@ant-design/react-native";
import { ClubItem } from "./redux/types";
import qs from "qs";
import { useNavigation } from "@react-navigation/native";

export default function MeetUpClub({ clubId }: { clubId: number }) {
  const token = useSelector(getUserToken);
  const navigation = useNavigation();

  const [clubItem, setClubItem] = React.useState<ClubItem>();
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>();

  const handleClickClubDetail = React.useCallback(() => {
    navigation.navigate("Club");
  }, []);

  const handleClickSubscribeButton = React.useCallback(() => {
    axios
      .post(CLUB_SUBSCRIBE_URL, qs.stringify({ club_id: clubId }), {
        headers: {
          Authorization: token.accessToken,
        },
      })
      .then(() => {
        setIsSubscribed(true);
      });
  }, []);

  const handleClickUnsubscribeButton = React.useCallback(() => {
    axios
      .post(CLUB_UNSUBSCRIBE_URL, qs.stringify({ club_id: clubId }), {
        headers: {
          Authorization: token.accessToken,
        },
      })
      .then(() => {
        setIsSubscribed(false);
      });
  }, []);

  React.useEffect(() => {
    const getClubInfoAsync = async () => {
      // 동아리 상세정보 가져오기
      try {
        const fetchedClubItem = await axios.get<ClubItem>(CLUB_DETAIL_URL, {
          headers: {
            Authorization: token.accessToken,
          },
          params: {
            club_id: clubId,
          },
        });
        setClubItem(fetchedClubItem.data);
        setIsSubscribed(fetchedClubItem.data.Is_user_subscribing_club);
      } catch (error) {
        console.log(error);
      }
    };
    getClubInfoAsync();
  }, [clubId]);

  return (
    <>
      {typeof clubItem !== "undefined" && (
        <>
          <View style={clubStyles.container}>
            <View style={clubStyles.clubNameContainer}>
              <TouchableWithoutFeedback onPress={handleClickClubDetail}>
                <View style={clubStyles.clubAvatarContainer}>
                  <Avatar size={40} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleClickClubDetail}>
                <View style={clubStyles.clubNameTextContainer}>
                  {clubItem.club_name !== null && (
                    <Text>{clubItem.club_name}</Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <View>
                {isSubscribed === false &&
                typeof isSubscribed !== "undefined" ? (
                  <Button onPress={handleClickSubscribeButton}>구독</Button>
                ) : (
                  <Button onPress={handleClickUnsubscribeButton}>
                    구독해지
                  </Button>
                )}
              </View>
            </View>
            <View style={clubStyles.clubIntroductionContainer}>
              {clubItem.club_description !== null && (
                <Text>{clubItem.club_description}</Text>
              )}
            </View>
          </View>
          <Divider />
        </>
      )}
    </>
  );
}

const clubStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  clubNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clubAvatarContainer: {
    alignSelf: "center",
  },
  clubNameTextContainer: {
    marginLeft: 16,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  clubIntroductionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
