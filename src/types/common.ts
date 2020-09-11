export interface PromiseX<T> extends Promise<T> {
  cancel: () => void;
}
