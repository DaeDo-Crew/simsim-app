import * as React from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import CardListHeader from "modules/CardListHeader";
import Divider from "modules/Divider";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import axios from "axios";
import { CLUB_NOTICE_ALL } from "./apiUrls";
import { ClubNoticeData } from "./redux/types";
import theme from "theme";
import { List } from "react-native-paper";
import _ from "underscore";

const ClubNoticeItem = ({
  content,
  createdTime,
}: {
  content: string;
  createdTime: string;
}) => {
  return (
    <View style={ClubNoticeItemStyles.container}>
      <Text
        style={ClubNoticeItemStyles.createdTimeText}
      >{`${createdTime}에 작성됨`}</Text>
      <Text style={ClubNoticeItemStyles.contentText}>{content}</Text>
    </View>
  );
};

export default function ClubNotice({ club_id }: { club_id: number }) {
  const userToken = useSelector(getUserToken);

  const [clubNoticeData, setClubNoticeData] = React.useState<
    ClubNoticeData[]
  >();

  React.useEffect(() => {
    axios({
      method: "GET",
      url: CLUB_NOTICE_ALL,
      params: {
        clubId: club_id,
      },
      headers: {
        Authorization: userToken.accessToken,
      },
    })
      .then((response) => {
        const sortedClubNoticeData = _.sortBy(
          response.data,
          "createdTime"
        ).reverse();
        setClubNoticeData(sortedClubNoticeData);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("동아리 공지사항을 불러오지 못했습니다.", "", [
          {
            text: "확인",
          },
        ]);
      });
  }, [club_id]);

  return (
    <>
      <CardListHeader listTitle="공지사항" isViewAll={false} />
      <View style={ClubNoticeStyles.clubNoticeItemContainer}>
        {typeof clubNoticeData !== "undefined" &&
          // 최근 공지사항 10개만 보여줌
          clubNoticeData.slice(0, 11).map((data) => {
            return (
              <List.Accordion key={data.noticeId} title={data.title}>
                <ClubNoticeItem
                  content={data.content}
                  createdTime={data.createdTime}
                />
              </List.Accordion>
            );
          })}
      </View>
      <Divider />
    </>
  );
}

const ClubNoticeItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginLeft: 32,
  },
  createdTimeText: {
    fontSize: 10,
    fontStyle: "italic",
    color: theme.colors.darkGrey,
  },
  contentText: {
    marginTop: 8,
    fontSize: 12,
  },
});

const ClubNoticeStyles = StyleSheet.create({
  clubNoticeItemContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
});
