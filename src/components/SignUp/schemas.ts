import * as yup from "yup";
import { IdCheckRequest, EmailCheckRequest } from "./redux/types";

export const idCheckRequestSchema = yup.object<IdCheckRequest>({
  loginId: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(),
});

export const emailCheckRequestSchema = yup.object<EmailCheckRequest>({
  // email 은 향후 uos.ac.kr 같은 특정 도메인만 허용하도록 regex로 변경해야함
  email: yup.string().email().required(),
  emailCheckCode: yup.string().required(),
});
