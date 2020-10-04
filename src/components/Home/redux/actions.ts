import { createAction } from "typesafe-actions";

export const setMeetUpId = createAction("SET_MEETUP_ID")<string>();
