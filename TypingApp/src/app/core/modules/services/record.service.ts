import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RecordRequset } from '../interfaces/record-resquest';
import { Observable,map } from 'rxjs';
import { ExecutionResponse } from '../interfaces/execution-response';
import { RecordResponse } from '../interfaces/record-response';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  apiUrl: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  write(data: RecordRequset): Observable<ExecutionResponse>{
    return this.http.post<ExecutionResponse>(`${this.apiUrl}Record/write`, data).pipe(
      map((response) => {
        if (response.success) {
          response.message = "Success";
        }
        return response;
      })
    );
  }
  read(userId: string): Observable<ExecutionResponse> {
    return this.http.get<ExecutionResponse>(`${this.apiUrl}Record/read/${userId}`).pipe(
      map((response: ExecutionResponse) => {
        if (response.success) {
          response.message = "Success";
        }
        return response;
      })
    );
  }
}
