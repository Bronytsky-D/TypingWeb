import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '../interfaces/lesson';
import { LESSONS } from '../../utils/lessons.data';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessons: Lesson[] = LESSONS;
  
  getLessonsByLanguage(lang: string): Lesson[] {
    const lessons = this.lessons.filter(lesson => lesson.language === lang);
    return lessons;
  }
  getLessonByIdAndLanguage(id: number, lang: string): Lesson | undefined {
    return this.lessons.find(lesson => lesson.id === id && lesson.language === lang);
  }
}