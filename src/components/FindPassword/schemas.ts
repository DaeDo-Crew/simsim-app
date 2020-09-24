import { FindPwRequest } from "./redux/types";
import * as yup from "yup";

export const findPwRequestSchema = yup.object<FindPwRequest>({
  email: yup.string().email().required(),
  loginId: yup.string().required(),
  newqw: yup.string().email().required(),
});
