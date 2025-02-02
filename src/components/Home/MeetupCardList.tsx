import * as React from "react";
import { FlatList } from "react-native";
import MeetupCardItem from "./MeetupCardItem";
import CardListHeader from "modules/CardListHeader";
import { MeetUpItem } from "components/MeetUp/redux/types";

export default function MeetupCardList({
  title,
  meetupList,
}: {
  title: string;
  meetupList?: MeetUpItem[] | null;
}) {
  return (
    <>
      {typeof meetupList !== "undefined" &&
        meetupList !== null &&
        meetupList.length !== 0 && (
          <>
            <CardListHeader
              listTitle={title}
              isViewAll={true}
              type="MEETUP"
              meetupList={meetupList}
            />
            <FlatList
              data={meetupList}
              renderItem={({ item }) => (
                <MeetupCardItem
                  item={item}
                  imageHeight={200}
                  imageWidth={200}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.meetingId)}
            />
          </>
        )}
    </>
  );
}
