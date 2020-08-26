import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Avatar from "modules/Avatar";
import { AntDesign } from "@expo/vector-icons";
import theme from "theme";
import Divider from "modules/Divider";

function MeetUpCommentHeader() {
  return (
    <View style={MeetUpCommentHeaderStyles.container}>
      <View style={MeetUpCommentHeaderStyles.avatar}>
        <Avatar size={30} />
      </View>
      <Text>작성자</Text>
      <View style={MeetUpCommentHeaderStyles.infoContainer}>
        <View style={MeetUpCommentHeaderStyles.favoriteContainer}>
          <AntDesign name="heart" size={15} color={theme.colors.primary} />
          <Text>999+</Text>
        </View>
      </View>
    </View>
  );
}

function MeetUpCommentContent() {
  return (
    <View style={MeetUpCommentContentStyles.container}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo
        odio neque, vitae semper mi iaculis vitae. Donec dui lectus, mollis eu
        faucibus quis, dictum egestas arcu. Phasellus vestibulum vestibulum
        dolor a gravida. Integer tellus arcu, lobortis in commodo at, bibendum
        non sem. Donec massa urna, tincidunt vitae sagittis ac, consequat sit
        amet nisi. Phasellus diam erat, rhoncus in elit non, volutpat hendrerit
        ipsum. Curabitur condimentum sollicitudin ex ac commodo. Duis pretium
        massa quam, in aliquam massa fermentum posuere. Fusce laoreet felis non
        diam finibus maximus. Etiam ut ligula et velit porttitor pharetra. Ut a
        vehicula lacus. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Etiam eget malesuada lacus. Vivamus molestie nunc id magna
        volutpat, tristique molestie nisi lacinia. Integer id convallis lacus.
      </Text>
    </View>
  );
}

export default function MeetUpComment() {
  return (
    <>
      <View style={MeetUpCommentStyles.container}>
        <Text style={MeetUpCommentStyles.title}>후기</Text>
        <MeetUpCommentHeader />
        <MeetUpCommentContent />
      </View>
      <Divider />
    </>
  );
}

const MeetUpCommentHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  avatar: {
    marginRight: 8,
  },
  infoContainer: {
    flexDirection: "row",
  },
  favoriteContainer: {
    flexDirection: "row",
  },
});

const MeetUpCommentContentStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
});

const MeetUpCommentStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
