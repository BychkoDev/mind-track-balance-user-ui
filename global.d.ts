export declare global {
  type Result<T, E> =
    | {
        ok: T;
        status?: number;
        err: null;
        default?: string;
      }
    | {
        ok: null;
        status?: number;
        err: E;
        default?: string;
      }
    | {
        ok: null;
        status?: number;
        err: null;
        default?: string;
    };

  type Option<T> = T | null;
}
