export type IdCheckRequest = {
  loginId: string;
  password: string;
  passwordConfirm: string;
};

export type EmailCheckRequest = {
  email: string;
  emailCheckCode: string;
};
