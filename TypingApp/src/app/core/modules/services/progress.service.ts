import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LessonProgress } from '../interfaces/lesson-progress';
import { ExecutionResponse } from '../interfaces/execution-response';

@Injectable({ providedIn: 'root' })
export class ProgressService {
    private api = `${environment.apiUrl}Progress`;
    constructor(private http: HttpClient) { }

    getProgress(userId: string, lessonId: number)
        : Observable<ExecutionResponse<LessonProgress>> {
        return this.http.get<ExecutionResponse<LessonProgress>>(
            `${this.api}/${userId}/${lessonId}`
        );
    }

    saveProgress(data: LessonProgress)
        : Observable<ExecutionResponse<LessonProgress>> {
        return this.http.post<ExecutionResponse<LessonProgress>>(
           `${this.api}/write`, data
        );
    }
}
