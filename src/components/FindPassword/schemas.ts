import { FindPwRequest } from "./redux/types";
import * as yup from "yup";
import { uosEmailRegex } from "components/Login/schemas";

export const findPwRequestSchema = yup.object<FindPwRequest>({
  email: yup
    .string()
    .matches(uosEmailRegex, "서울시립대학교 이메일이 아닙니다.")
    .required("서울시립대학교 이메일을 입력해주세요."),
  newqw: yup
    .string()
    .min(9, "9자 이상의 비밀번호를 입력해주세요.")
    .required("9자 이상의 비밀번호를 입력해주세요."),
});
