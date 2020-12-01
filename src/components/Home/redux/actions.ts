import { createAction } from "typesafe-actions";

export const setMeetUpId = createAction("SET_MEETUP_ID")<string>();

export const setMeetUpRefresh = createAction("SET_MEET_UP_REFRESH")<boolean>();
