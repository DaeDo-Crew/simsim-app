import * as React from "react";
import { MeetUpItem } from "components/MeetUp/redux/types";
import { Text } from "react-native-paper";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";

export default function MeetupCardItem({ item }: { item: MeetUpItem }) {
  const navigation = useNavigation();

  const handleClickMeetUpCardItem = () => {
    navigation.navigate("MeetUp", { meetingId: item.meetingId });
  };

  return (
    <TouchableWithoutFeedback onPress={handleClickMeetUpCardItem}>
      <View style={MeetUpCardItemStyles.itemContainer}>
        {item.imgUrlList.length !== 0 ? (
          <Image
            source={{ uri: item.imgUrlList[0] }}
            style={MeetUpCardItemStyles.cardImage}
          />
        ) : (
          <Image
            source={require("../../../assets/no_image.png")}
            style={MeetUpCardItemStyles.cardImage}
          />
        )}

        <View style={MeetUpCardItemStyles.itemInfoContainer}>
          <Text style={MeetUpCardItemStyles.cardItemTitle}>
            {item.meetingName}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const MeetUpCardItemStyles = StyleSheet.create({
  itemContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  itemInfoContainer: {
    marginTop: 16,
  },
  cardItemTitle: {
    fontSize: 16,
  },
  cardImage: {
    width: 200,
    height: 200,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: theme.borderRadius,
  },
});
