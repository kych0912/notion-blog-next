export interface ActionState<T> {
  error?: boolean;
  message: T;
  success?: boolean;
}
