import { createAction } from "typesafe-actions";
import { MeetUpItem } from "./types";

export const setMeetUpList = createAction("SET_MEETUP_LIST")<MeetUpItem[]>();
