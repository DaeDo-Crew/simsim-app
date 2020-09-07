import { createAction } from "typesafe-actions";

export const setSignUpLoginId = createAction("SET_SIGN_UP_LOGIN_ID")<string>();

export const setSignUpPassword = createAction("SET_SIGN_UP_PASSWORD")<string>();

export const setSignUpEmail = createAction("SET_SIGN_UP_EMAIL")<string>();

export const setSignUpNickname = createAction("SET_SIGN_UP_NICKNAME")<string>();
