export interface ExecutionResponse<T> {
  map(arg0: (p: any) => any[]): Iterable<readonly [unknown, unknown]> | null | undefined;
  success: boolean;
  message: string;
  result: T;
}