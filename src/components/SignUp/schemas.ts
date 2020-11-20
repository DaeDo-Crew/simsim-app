import * as yup from "yup";
import { SignUpRequest } from "./redux/types";

export const signUpRequestSchema = yup.object<SignUpRequest>({
  loginId: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
  code: yup.string().required(),
  nickname: yup.string().required(),
});
