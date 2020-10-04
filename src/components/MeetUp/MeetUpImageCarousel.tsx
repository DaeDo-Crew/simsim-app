import * as React from "react";
import { StyleSheet, View, Image, Dimensions, Alert } from "react-native";
import { Carousel } from "@ant-design/react-native";
import axios from "axios";

type TempData = {
  id: number;
  imageSource: string;
};

const TEMP_DATA: TempData[] = [
  {
    id: 1,
    imageSource: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    id: 2,
    imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
  },
  {
    id: 3,
    imageSource: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    id: 4,
    imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
  },
];

function MeetUpImage({ imageSource }: { imageSource: string }) {
  return (
    <View style={styles.carouselItem}>
      <Image
        source={{
          uri: imageSource,
          width: Dimensions.get("screen").width,
          height: 300,
        }}
      />
    </View>
  );
}

export default function MeetUpImageCarousel() {
  const [seletedIndex, setSelectedIndex] = React.useState(2);
  const onHorizontalSelectedIndexChange = React.useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);


  return (
    <View>
      <View>
        <Carousel
          style={styles.carousel}
          selectedIndex={seletedIndex}
          infinite
          afterChange={onHorizontalSelectedIndexChange}
        >
          {TEMP_DATA.map((item) => {
            return <MeetUpImage key={item.id} imageSource={item.imageSource} />;
          })}
        </Carousel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
  },
  carouselItem: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
});
