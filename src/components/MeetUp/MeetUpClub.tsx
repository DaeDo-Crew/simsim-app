import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Divider from "modules/Divider";
import theme from "theme";
import Avatar from "modules/Avatar";
import axios, { AxiosResponse } from "axios";
import { CLUB_NAME_URL, CLUB_DESCRIPTION_URL, CLUB_IMAGE_URL } from "./apiUrls";
import { getUserToken } from "components/Login/redux/selectors";

export default function MeetUpClub({ clubId }: { clubId: number }) {
  const token = useSelector(getUserToken);

  const [clubName, setClubName] = React.useState<AxiosResponse | null>(null);
  const [
    clubDescription,
    setClubDescription,
  ] = React.useState<AxiosResponse | null>(null);
  const [clubImageUrl, setClubImageUrl] = React.useState<AxiosResponse | null>(
    null
  );

  React.useEffect(() => {
    const getClubInfoAsync = async () => {
      // 동아리 이름 가져오기
      try {
        const fetchedClubName = await axios.get<string>(CLUB_NAME_URL, {
          headers: {
            Authorization: token.accessToken,
          },
          params: {
            clubId: clubId,
          },
        });
        setClubName(fetchedClubName);
      } catch (error) {
        console.log(error);
      }

      //동아리 설명 가져오기
      try {
        const fetchedClubDescription = await axios.get<string>(
          CLUB_DESCRIPTION_URL,
          {
            headers: {
              Authorization: token.accessToken,
            },
            params: {
              clubId: clubId,
            },
          }
        );
        setClubDescription(fetchedClubDescription);
      } catch (error) {
        console.log(error);
      }

      //동아리 이미지 url 가져오기
      try {
        const fetchedClubUrl = await axios.get<string>(CLUB_IMAGE_URL, {
          headers: {
            Authorization: token.accessToken,
          },
          params: {
            clubId: clubId,
          },
        });
        setClubImageUrl(fetchedClubUrl);
      } catch (error) {
        console.log(error);
      }
    };
    getClubInfoAsync();
  }, [clubId]);

  return (
    <>
      <View style={clubStyles.container}>
        <View style={clubStyles.clubNameContainer}>
          <View style={clubStyles.clubAvatarContainer}>
            <Avatar size={40} />
          </View>
          <View style={clubStyles.clubNameTextContainer}>
            <Text>{clubName}</Text>
          </View>
        </View>
        <View style={clubStyles.clubIntroductionContainer}>
          <Text>{clubDescription}</Text>
        </View>
        {/* <View style={clubStyles.clubInfoCardContainer}>
          <View style={clubStyles.clubInfoCard}>
            <Text>140</Text>
            <Text>모임기록</Text>
          </View>
          <View style={clubStyles.clubInfoCard}>
            <Text>140</Text>
            <Text>모임기록</Text>
          </View>
          <View style={clubStyles.clubInfoCard}>
            <Text>140</Text>
            <Text>모임기록</Text>
          </View>
        </View> */}
      </View>
      <Divider />
    </>
  );
}

const clubStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  clubNameContainer: {
    flexDirection: "row",
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
  clubInfoCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clubInfoCard: {
    borderRadius: 6,
    padding: 16,
    backgroundColor: theme.colors.secondary,
  },
});
