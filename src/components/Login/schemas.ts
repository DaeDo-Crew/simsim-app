import * as yup from "yup";
import { LoginRequest } from "./redux/types";

export const uosEmailRegex = /^[A-Za-z0-9._%+-]+@uos.ac.kr$/;

export const loginRequestSchema = yup.object<LoginRequest>({
  email: yup
    .string()
    .matches(uosEmailRegex, "서울시립대학교 이메일이 아닙니다.")
    .required("서울시립대학교 이메일을 입력해주세요."),
  password: yup
    .string()
    .min(9, "9자 이상의 비밀번호를 입력해주세요.")
    .required("9자 이상의 비밀번호를 입력해주세요."),
});
