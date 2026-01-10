export interface AuthError {
  error: string;
  message: string;
}
export interface ActionState<T> {
  ok: boolean;
  message: T;
}

export type BaseServerResposne<T, E = AuthError> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: E };
