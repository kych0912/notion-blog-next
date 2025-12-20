import type { JwtPayload } from 'jsonwebtoken';

interface UserLogin {
  id: string;
  password: string;
}

interface AuthResponse {
  message: string;
  isLogged: boolean;
  id: string | JwtPayload;
}
