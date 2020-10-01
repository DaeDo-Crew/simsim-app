import * as React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { MeetupCard } from "./redux/types";
import theme from "theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { getUserToken } from "components/Login/redux/selectors";
import { setMeetUpList } from "./redux/actions";
import { getMeetUpList } from './redux/selectors';
import { MEEING_LIST_URL } from './apiUrls'

// const DATA: MeetupCard[] = [
//   {
//     id: "1",
//     title: "일일 댄스 클래스",
//     communityName: "RAH",
//     imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
//     dueDay: "D-7",
//   },
//   {
//     id: "2",
//     title: "일일 댄스 클래스",
//     communityName: "아발론",
//     imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
//     dueDay: "D-6",
//   },
//   {
//     id: "3",
//     title: "일일 댄스 클래스",
//     communityName: "RAH",
//     imageSource: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
//     dueDay: "D-7",
//   },
//   {
//     id: "4",
//     title: "일일 댄스 클래스",
//     communityName: "RAH",
//     imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
//     dueDay: "D-7",
//   },
// ];

function MeetupCardListHeader() {
  return <Text style={styles.meetupCardListheader}>모집중인 모임</Text>;
}

export default function MeetupCardList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const meetUpList = useSelector(getMeetUpList);

  const handleClickMeetUpCardItem = React.useCallback(() => {
    navigation.navigate("MeetUp");
  }, []);
  const MeetupCardItem = ({ item }: { item: MeetupCard }) => {
    return (
      <TouchableWithoutFeedback onPress={handleClickMeetUpCardItem}>
        <View style={styles.meetupCardItemContainer}>
          <Image
            source={{ uri: item.imgUrlList[0], width: 150, height: 150 }}
            style={styles.meetupCardImage}
          />
          <View style={styles.meetupCardItemInfoContainer}>
            <Text style={styles.meetupCardItemTitle}>{item.meetingName}</Text>
            <View style={styles.meetupCardItemSubInfoContainer}>
              <Text>{item.clubName}</Text>
              <Text>{item.deadline}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  React.useEffect(() => {
    console.log(token)
    if(token !== null) {
      axios
      .get( MEEING_LIST_URL , {
        headers: { 
          "Authorization" : token.accessToken
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(setMeetUpList(response.data));
        console.log(meetUpList);
      })
      .catch((error) => {
        console.log("모임 불러오기 실패");
        console.log(error);
        
      });
    }
  }, [])

  return (
    <View style={styles.meetupCardListContainer}>
      <MeetupCardListHeader />
      <FlatList
        data={meetUpList}
        renderItem={MeetupCardItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.meetingId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  meetupCardListContainer: {},
  meetupCardItemContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: `${theme.colors.ligthGrey}`,
    borderRadius: theme.borderRadius,
  },
  meetupCardItemInfoContainer: {
    padding: 8,
  },
  meetupCardItemSubInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meetupCardListheader: {
    marginStart: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  meetupCardItemTitle: {
    fontSize: 16,
  },
  meetupCardImage: {
    resizeMode: "cover",
    borderRadius: theme.borderRadius,
  },
});
