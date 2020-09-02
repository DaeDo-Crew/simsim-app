import { LoginResponse } from "./types";
import { createAction } from "typesafe-actions";

export const setUserToken = createAction("SET_USER_TOKEN")<LoginResponse>();
