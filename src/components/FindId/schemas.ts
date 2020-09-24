import { FindIdRequest } from "./redux/types";
import * as yup from "yup";

export const findIdRequestSchema = yup.object<FindIdRequest>({
  insert_code: yup.string().required(),
  insert_email: yup.string().email().required(),
});
