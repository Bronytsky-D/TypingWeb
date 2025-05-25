import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessons: Lesson[] = [
    { id: 1, title: 'Вступ', description: 'Правильна постава та позиція рук', keys: [] },
    { id: 2, title: 'Вказівні пальці', description: 'Клавіші: f, j, ', keys: ['f', 'j'] },
  ];

  getLessons(): Observable<Lesson[]> {
    return of(this.lessons);
  }
}