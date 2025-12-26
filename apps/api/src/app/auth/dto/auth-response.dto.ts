export interface JwtPayload {
  sub: string;
  email: string;
  name?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}
