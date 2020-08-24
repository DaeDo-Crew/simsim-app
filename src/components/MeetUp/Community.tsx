import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "modules/Divider";
import UserAvatar from "react-native-user-avatar";
import theme from "theme";

export default function Community() {
  return (
    <>
      <View style={communityStyles.container}>
        <View style={communityStyles.communityNameContainer}>
          <UserAvatar name="RAH" borderRadius={100} />
          <View style={communityStyles.communityNameTextContainer}>
            <Text>RAH</Text>
            <Text>시립대 대표 댄스동아리</Text>
          </View>
        </View>
        <View style={communityStyles.communityIntroductionContainer}>
          <Text>
            동아리 소개글 ~~ Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Cras commodo odio neque, vitae semper mi iaculis vitae. Donec
            dui lectus, mollis eu faucibus quis, dictum egestas arcu. Phasellus
            vestibulum vestibulum dolor a gravida. Integer tellus arcu, lobortis
            in commodo at, bibendum non sem. Donec massa urna, tincidunt vitae
            sagittis ac, consequat sit amet nisi. Phasellus diam erat, rhoncus
            in elit non, volutpat hendrerit ipsum. Curabitur condimentum
            sollicitudin ex ac commodo. Duis pretium massa quam, in aliquam
            massa fermentum posuere. Fusce laoreet felis non diam finibus
            maximus. Etiam ut ligula et velit porttitor pharetra. Ut a vehicula
            lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Etiam eget malesuada lacus. Vivamus molestie nunc id magna volutpat,
            tristique molestie nisi lacinia. Integer id convallis lacus.
          </Text>
        </View>
        <View style={communityStyles.communityInfoCardContainer}>
          <View style={communityStyles.communityInfoCard}>
            <Text>140</Text>
            <Text>모임기록</Text>
          </View>
          <View style={communityStyles.communityInfoCard}>
            <Text>140</Text>
            <Text>모임기록</Text>
          </View>
          <View style={communityStyles.communityInfoCard}>
            <Text>140</Text>
            <Text>모임기록</Text>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}

const communityStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  communityNameContainer: {
    flexDirection: "row",
  },
  communityNameTextContainer: {
    marginLeft: 16,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  communityIntroductionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  communityInfoCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  communityInfoCard: {
    borderRadius: 6,
    padding: 16,
    backgroundColor: theme.colors.secondary,
  },
});
