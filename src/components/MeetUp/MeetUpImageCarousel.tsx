import * as React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import theme from "theme";

const SCREEN_WIDTH = Dimensions.get("screen").width;

type TempData = {
  imageSource: string;
};

const TEMP_DATA: TempData[] = [
  {
    imageSource: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
  },
  {
    imageSource: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
  },
  {
    imageSource: "http://homepages.cae.wisc.edu/~ece533/images/cat.png",
  },
];

const MeetUpImage = ({ item }: { item: TempData }) => {
  return (
    <View style={MeetUpImageStyle.itemContainer}>
      <Image
        source={{ uri: item.imageSource }}
        style={MeetUpImageStyle.image}
      />
    </View>
  );
};

export default function MeetUpImageCarousel() {
  const [seletedIndex, setSelectedIndex] = React.useState(2);
  const onHorizontalSelectedIndexChange = React.useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const CarouselPagination = () => {
    return (
      <Pagination
        dotsLength={TEMP_DATA.length}
        activeDotIndex={seletedIndex}
        containerStyle={{ backgroundColor: theme.colors.white }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: theme.colors.primary,
        }}
        dotContainerStyle={{
          marginHorizontal: 2,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <>
      <Carousel
        data={TEMP_DATA}
        renderItem={MeetUpImage}
        onSnapToItem={(index) => onHorizontalSelectedIndexChange(index)}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
      />
      <CarouselPagination />
    </>
  );
}

const MeetUpImageStyle = StyleSheet.create({
  itemContainer: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: theme.borderRadius,
  },
});
