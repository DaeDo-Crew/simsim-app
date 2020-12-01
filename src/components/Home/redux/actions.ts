import { createAction } from "typesafe-actions";

export const setMeetUpId = createAction("SET_MEETUP_ID")<string>();

export const setMyMeetUpRefresh = createAction(
  "SET_MY_MEET_UP_REFRESH"
)<boolean>();

export const setMyClubMeetUpRefresh = createAction(
  "SET_MY_CLUB_MEET_UP_REFRESH"
)<boolean>();
