export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'patient';
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;
