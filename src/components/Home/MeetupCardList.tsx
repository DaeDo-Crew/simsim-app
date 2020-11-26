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
  meetupList?: MeetUpItem[];
}) {
  return (
    <>
      {typeof meetupList !== "undefined" && (
        <>
          <CardListHeader listTitle={title} isViewAll={true} />
          <FlatList
            data={meetupList}
            renderItem={({ item }) => <MeetupCardItem item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.meetingId)}
          />
        </>
      )}
    </>
  );
}
