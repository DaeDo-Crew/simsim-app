import { RootState } from "redux/types";

export const getBannerState = (state: RootState) => state.banner.state;
