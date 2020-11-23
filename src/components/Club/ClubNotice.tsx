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

const ClubNoticeItem = (props: ClubNoticeData) => {
  const { title, content } = props;
  return (
    <View style={ClubNoticeItemStyles.container}>
      <Text style={ClubNoticeItemStyles.titleText}>{title}</Text>
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
        setClubNoticeData(response.data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("데이터를 불러오지 못했습니다.", "", [
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
          clubNoticeData.slice(0, 11).map((data) => {
            return (
              <ClubNoticeItem
                key={data.noticeId}
                title={data.title}
                content={data.content}
                createdTime={data.createdTime}
                noticeId={data.noticeId}
                clubId={data.clubId}
              />
            );
          })}
      </View>
      <Divider />
    </>
  );
}

const ClubNoticeItemStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginEnd: 32,
    marginHorizontal: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: theme.colors.black,
  },
  contentText: {
    fontSize: 12,
    color: theme.colors.darkGrey,
  },
});

const ClubNoticeStyles = StyleSheet.create({
  clubNoticeItemContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
});
