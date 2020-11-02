export type LoginResponse = {
  accessToken: string | null;
  // refreshToken: string;
};

export type LoginRequest = {
  id: string;
  password: string;
};
