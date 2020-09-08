import * as yup from "yup";
import { IdCheckRequest } from "./redux/types";

export const idCheckRequestSchema = yup.object<IdCheckRequest>({
  loginId: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(),
});
