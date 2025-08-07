export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  hash_password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  username: string;
  full_name: string;
  email: string;
  hash_password: string;
}

export interface AuthResponse {
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  user?: User;
  message: string;
}