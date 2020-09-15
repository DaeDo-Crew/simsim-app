export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  id: string;
  password: string;
};
