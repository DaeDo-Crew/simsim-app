import { createAction } from "typesafe-actions";

export const getMeetingItemList = createAction("GET_MEETING_ITEM_LIST")<string>();
