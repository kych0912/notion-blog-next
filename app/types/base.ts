export interface AuthError {
  error: string;
  message: string;
}

export type BaseServerResposne<T, E = AuthError> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: E };
