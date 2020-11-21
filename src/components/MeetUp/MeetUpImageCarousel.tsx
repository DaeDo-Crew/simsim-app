import * as React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import theme from "theme";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const MeetUpImage = ({ item }: { item: string }) => {
  return (
    <View style={MeetUpImageStyle.itemContainer}>
      <Image source={{ uri: item }} style={MeetUpImageStyle.image} />
    </View>
  );
};

export default function MeetUpImageCarousel({
  imageUrlList,
}: {
  imageUrlList: string[] | null;
}) {
  const [seletedIndex, setSelectedIndex] = React.useState(0);
  const onHorizontalSelectedIndexChange = React.useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const CarouselPagination = () => {
    return (
      <>
        {imageUrlList !== null && (
          <Pagination
            dotsLength={imageUrlList.length}
            activeDotIndex={seletedIndex}
            containerStyle={MeetUpImageCarouselStyle.paginationContainer}
            dotStyle={MeetUpImageCarouselStyle.pageDot}
            dotContainerStyle={MeetUpImageCarouselStyle.pageDotContainer}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        )}
      </>
    );
  };

  return (
    <View style={MeetUpImageCarouselStyle.carouselContainer}>
      {imageUrlList !== null && imageUrlList.length !== 0 ? (
        <>
          <Carousel
            data={imageUrlList}
            renderItem={MeetUpImage}
            onSnapToItem={(index) => onHorizontalSelectedIndexChange(index)}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
          />
          <CarouselPagination />
        </>
      ) : (
        <View style={MeetUpImageStyle.itemContainer}>
          <Image
            source={require("../../../assets/no_image.png")}
            style={MeetUpImageStyle.image}
          />
        </View>
      )}
    </View>
  );
}

const MeetUpImageCarouselStyle = StyleSheet.create({
  carouselContainer: {
    marginBottom: 32,
  },
  paginationContainer: {
    backgroundColor: theme.colors.white,
    paddingTop: 32,
    paddingBottom: 0,
  },
  pageDotContainer: {
    marginHorizontal: 2,
  },
  pageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: theme.colors.primary,
  },
});

const MeetUpImageStyle = StyleSheet.create({
  itemContainer: {
    width: SCREEN_WIDTH,
    height: 480,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
