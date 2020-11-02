import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "modules/Divider";
import theme from "theme";
import Avatar from "modules/Avatar";

export default function MeetUpClub({ clubId }: { clubId: number }) {
  React.useEffect(() => {
    console.log(clubId);
  });
  return (
    <>
      <View style={clubStyles.container}>
        <View style={clubStyles.clubNameContainer}>
          <View style={clubStyles.clubAvatarContainer}>
            <Avatar size={40} />
          </View>
          <View style={clubStyles.clubNameTextContainer}>
            <Text>RAH</Text>
          </View>
        </View>
        <View style={clubStyles.clubIntroductionContainer}>
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
