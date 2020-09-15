export type IdCheckRequest = {
  loginId: string;
  password: string;
};

export type EmailCheckRequest = {
  email: string;
  emailCheckCode: string;
};

export type NicknameCheckRequest = {
  nickname: string;
};
