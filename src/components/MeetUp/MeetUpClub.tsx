import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
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
import { Button } from "react-native-paper";
import { ClubItem } from "./redux/types";

export default function MeetUpClub({ clubId }: { clubId: number }) {
  const token = useSelector(getUserToken);

  const [clubItem, setClubItem] = React.useState<ClubItem>();
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>();

  const handleClickSubscribeButton = React.useCallback(() => {
    axios({
      method: "POST",
      url: CLUB_SUBSCRIBE_URL,
      params: {
        club_id: clubId,
      },
      headers: {
        Authorization: token.accessToken,
      },
    }).then(() => {
      setIsSubscribed(true);
    });
  }, []);

  const handleClickUnsubscribeButton = React.useCallback(() => {
    axios({
      method: "DELETE",
      url: CLUB_UNSUBSCRIBE_URL,
      headers: {
        Authorization: token.accessToken,
      },
      params: {
        club_id: clubId,
      },
    })
      .then((response) => {
        setIsSubscribed(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
        console.log(clubId);
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
            <View style={clubStyles.clubHeaderContainer}>
              <View style={clubStyles.clubNameContainer}>
                <Avatar size={48} imageSource={clubItem.club_profile_image} />
                <View style={clubStyles.clubNameTextContainer}>
                  {clubItem.club_name !== null && (
                    <Text style={clubStyles.clubNameText}>
                      {clubItem.club_name}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                {isSubscribed === false &&
                typeof isSubscribed !== "undefined" ? (
                  <Button
                    mode="text"
                    onPress={handleClickSubscribeButton}
                    labelStyle={clubStyles.subScribeButtonLabel}
                  >
                    구독
                  </Button>
                ) : (
                  <Button
                    mode="text"
                    onPress={handleClickUnsubscribeButton}
                    labelStyle={clubStyles.subScribeButtonLabel}
                  >
                    구독해지
                  </Button>
                )}
              </View>
            </View>
            {clubItem.club_description !== null && (
              <View style={clubStyles.clubIntroductionContainer}>
                <Text>{clubItem.club_description}</Text>
              </View>
            )}
          </View>
          <Divider />
        </>
      )}
    </>
  );
}

const clubStyles = StyleSheet.create({
  container: {
    marginVertical: 32,
  },
  clubHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clubNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clubNameTextContainer: {
    marginLeft: 16,
  },
  clubNameText: {
    fontSize: 16,
    fontWeight: "700",
  },
  clubIntroductionContainer: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  subScribeButtonLabel: {
    fontWeight: "700",
    fontSize: 16,
  },
});
