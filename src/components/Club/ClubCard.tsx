import * as React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Divider from "modules/Divider";
import Avatar from "modules/Avatar";
import { getUserToken } from "components/Login/redux/selectors";
import { Button } from "react-native-paper";
import { ClubItem } from "./redux/types";
import { useNavigation } from "@react-navigation/native";
import { axiosInstance } from "utils/axiosInstance";
import { showSnackbar } from "modules/Snackbar/redux/actions";

export default function ClubCard({ clubId }: { clubId: number }) {
  const token = useSelector(getUserToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [clubItem, setClubItem] = React.useState<ClubItem>();
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>();

  const handleMoveToClubClicked = React.useCallback(() => {
    navigation.navigate("Club", {
      club_id: clubId,
      club_name: typeof clubItem !== "undefined" ? clubItem.club_name : "",
    });
  }, [clubId, clubItem?.club_name]);

  const handleClickSubscribeButton = React.useCallback(() => {
    axiosInstance({
      method: "POST",
      url: "/club/createSubs",
      params: {
        club_id: clubId,
      },
      headers: {
        Authorization: token.accessToken,
      },
    }).then(() => {
      dispatch(showSnackbar({ visible: true, message: "구독했습니다." }));
      setIsSubscribed(true);
    });
  }, []);

  const handleClickUnsubscribeButton = React.useCallback(() => {
    axiosInstance({
      method: "DELETE",
      url: "/club/deleteSubs",
      headers: {
        Authorization: token.accessToken,
      },
      params: {
        club_id: clubId,
      },
    }).then(() => {
      dispatch(showSnackbar({ visible: true, message: "구독취소했습니다." }));
      setIsSubscribed(false);
    });
  }, []);

  React.useEffect(() => {
    const getClubInfoAsync = async () => {
      // 동아리 상세정보 가져오기
      try {
        const fetchedClubItem = await axiosInstance
          .get<ClubItem>("/club/ClubPackage", {
            headers: {
              Authorization: token.accessToken,
            },
            params: {
              club_id: clubId,
            },
          })
          .then((response) => {
            return response.data;
          });
        setClubItem(fetchedClubItem);
        setIsSubscribed(fetchedClubItem.Is_user_subscribing_club);
      } catch (error) {
        console.log(error);
      }
    };
    getClubInfoAsync();
  }, [clubId, isSubscribed]);

  return (
    <>
      {typeof clubItem !== "undefined" && (
        <>
          <View style={clubStyles.container}>
            <View style={clubStyles.clubHeaderContainer}>
              <TouchableWithoutFeedback onPress={handleMoveToClubClicked}>
                <View style={clubStyles.clubNameContainer}>
                  <Avatar size={48} imageSource={clubItem.club_profile_image} />
                  <View style={clubStyles.clubNameTextContainer}>
                    {clubItem.club_name !== null && (
                      <>
                        <Text style={clubStyles.clubNameText}>
                          {clubItem.club_name}
                        </Text>
                        <Text>{`구독자 ${clubItem.NumSubscribe}명`}</Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
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
                    구독취소
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
