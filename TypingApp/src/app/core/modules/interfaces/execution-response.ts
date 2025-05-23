import { RecordResponse } from "./record-response";

export interface ExecutionResponse {
  success: boolean;
  message: string;
  result: RecordResponse[];
}