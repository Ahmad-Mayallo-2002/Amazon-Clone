export type ErrorReason =
  | string
  | Record<
      string,
      {
        errors: string[];
      }
    >;
