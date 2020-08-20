import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "modules/Divider";

export default function MeetUpContent() {
  return (
    <>
      <View style={MeetUpContentStyles.container}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo
          odio neque, vitae semper mi iaculis vitae. Donec dui lectus, mollis eu
          faucibus quis, dictum egestas arcu. Phasellus vestibulum vestibulum
          dolor a gravida. Integer tellus arcu, lobortis in commodo at, bibendum
          non sem. Donec massa urna, tincidunt vitae sagittis ac, consequat sit
          amet nisi. Phasellus diam erat, rhoncus in elit non, volutpat
          hendrerit ipsum. Curabitur condimentum sollicitudin ex ac commodo.
          Duis pretium massa quam, in aliquam massa fermentum posuere. Fusce
          laoreet felis non diam finibus maximus. Etiam ut ligula et velit
          porttitor pharetra. Ut a vehicula lacus. Interdum et malesuada fames
          ac ante ipsum primis in faucibus. Etiam eget malesuada lacus. Vivamus
          molestie nunc id magna volutpat, tristique molestie nisi lacinia.
          Integer id convallis lacus.
        </Text>
      </View>
      <Divider />
    </>
  );
}

const MeetUpContentStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
