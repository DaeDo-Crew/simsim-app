import { createAction } from "typesafe-actions";
import { BannerPayload } from "./types";

export const showBanner = createAction("SHOW_BANNER")<BannerPayload | null>();
