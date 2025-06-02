import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessons: Lesson[] = [
    { id: 1, title: 'Lesson 1', description: 'F (ліва вказівний) та J (права вказівний)', keys: ['f', 'j'], content: ' ', language: 'en' },
    { id: 1, title: 'Урок 1', description: '...', keys: ['а', 'с'], content: '...', language: 'uk' },
    // інші уроки тут, всі з language
  ];

  getLessonsByLanguage(lang: 'uk' | 'en'): Observable<Lesson[]> {
    const lessons = this.lessons.filter(lesson => lesson.language === lang);
    return of(lessons);
  }
  getLessonByIdAndLanguage(id: number, lang: 'uk' | 'en'): Lesson | undefined {
    return this.lessons.find(lesson => lesson.id === id && lesson.language === lang);
  }
}