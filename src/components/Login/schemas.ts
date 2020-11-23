import * as yup from "yup";
import { LoginRequest } from "./redux/types";

export const loginRequestSchema = yup.object<LoginRequest>({
  email: yup.string().required(),
  password: yup.string().required(),
});
