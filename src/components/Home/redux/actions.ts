import { createAction } from "typesafe-actions";
import { MeetupCard } from "./types";

export const setMeetUpId = createAction("SET_MEETUP_ID")<string>();

export const setMeetUpList = createAction("SET_MEETUP_LIST")<MeetupCard[]>();
