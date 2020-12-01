import * as yup from "yup";
import { SignUpRequest } from "./redux/types";
import { uosEmailRegex } from "components/Login/schemas";

export const signUpRequestSchema = yup.object<SignUpRequest>({
  email: yup
    .string()
    .matches(uosEmailRegex, "서울시립대학교 이메일이 아닙니다.")
    .required("서울시립대학교 이메일을 입력해주세요."),
  password: yup
    .string()
    .min(9, "9자 이상의 비밀번호를 입력해주세요.")
    .required("9자 이상의 비밀번호를 입력해주세요."),
  code: yup
    .string()
    .uppercase("대문자의 인증코드를 입력해주세요.")
    .length(4, "4자리의 인증코드를 입력해주세요.")
    .required("인증코드를 입력해주세요."),
  nickname: yup.string().required("닉네임을 입력해주세요."),
});
