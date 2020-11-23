export type LoginResponse = {
  accessToken: string | null;
  // refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
