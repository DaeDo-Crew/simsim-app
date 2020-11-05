import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Divider from "modules/Divider";
import Avatar from "modules/Avatar";
import axios from "axios";
import { CLUB_DETAIL_URL } from "./apiUrls";
import { getUserToken } from "components/Login/redux/selectors";
import { Button } from "@ant-design/react-native";
import { ClubItem } from "./redux/types";

export default function MeetUpClub({ clubId }: { clubId: number }) {
  const token = useSelector(getUserToken);

  const [clubItem, setClubItem] = React.useState<ClubItem>();

  const handleClickSubscribeButton = React.useCallback(() => {}, []);

  React.useEffect(() => {
    const getClubInfoAsync = async () => {
      // 동아리 이름 가져오기
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
              <View style={clubStyles.clubAvatarContainer}>
                <Avatar size={40} />
              </View>
              <View style={clubStyles.clubNameTextContainer}>
                {clubItem.club_name !== null && (
                  <Text>{clubItem.club_name}</Text>
                )}
              </View>
              <View>
                <Button>구독</Button>
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
